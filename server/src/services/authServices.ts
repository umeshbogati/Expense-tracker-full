import { NUMBER_OF_SALT_ROUNDS } from "../constants/auth";
import { UserLoginRequest, UserRegisterRequest, UserWithRolesAndPermission } from "../interfaces/user";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import SessionModel from "../models/SessionModel";
import { logger } from "../utils/logger";

export const register = async (data: UserRegisterRequest) => {
    const { name, email, password } = data;

    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS);

    return await UserModel.create({ name, email, password: hashedPassword });
}


export const login = async (data: UserLoginRequest) => {
    const { email, password } = data;

    const user = await UserModel.findOne({ email }).populate({
        path: "roles",
        populate: {
            path: "permissions"
        }
    }).select("+password") as UserWithRolesAndPermission;

    if (!user) {
        logger.error("[AUTH-SERVICES] [LOGIN] Login failed - User not found")
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const roles = user?.roles?.map((role) => role.name) ?? [];
    const permissions = user?.roles?.flatMap((role) => role.permissions?.map((permission) => permission.name) ?? []) ?? [];

    const accessToken = await generateAccessToken(user, roles, permissions);
    const refreshToken = await generateRefreshToken(user);
        
    // Assignment: Use the expiry date from the refresh token
    await SessionModel.create({ userId: user.id, refreshToken, expiresAt:  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})

    return { 
        accessToken, 
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles,
            permissions
        }
    };
}

export const generateAccessTokenBasedOnRefreshToken = async (refreshToken: string) => {
    const session = await SessionModel.findOne({ refreshToken });

    if (!session) {

        throw new Error("Invalid refresh token");
    }

    const user = await UserModel.findOne({ _id: session.userId }).populate({
        path: "roles",
        populate: {
            path: "permissions",
        }
    }).select("+password") as UserWithRolesAndPermission;

    if (!user) {
        throw new Error("User not found");
    }


    const roles = user?.roles?.map((role) => role.name) ?? [];

    
    const permissions = user?.roles?.flatMap((role) => role.permissions?.map((permission) => permission.name) ?? []) ?? [];

    logger.info(`[AUTH-SERVICES] [GENERATE-ACCESS-TOKEN] Generating new access token for user: ${user.email} based on refresh token`)

    const accessToken = generateAccessToken(user, roles, permissions);

    return {
        accessToken,
    };
}

export const logout = async (refreshToken: string) => {
    // Get the userId from the refresh token and delete all refresh tokens of the user from the database to logout from all devices
    const session = await SessionModel.findOne({ refreshToken });

    if (!session) {
        throw new Error("Invalid refresh token");
    }

    await SessionModel.deleteMany({ userId: session?.userId });
}