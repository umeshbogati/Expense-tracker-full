import { NUMBER_OF_SALT_ROUNDS } from "../constants/auth";
import { UserLoginRequest, UserRegisterRequest } from "../interfaces/user";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import SessionModel from "../models/SessionModel";
import jwt from "jsonwebtoken";

export const register = async (data: UserRegisterRequest) => {
  const { name, email, password } = data;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS);
  return await UserModel.create({ name, email, password: hashedPassword });
};

export const login = async (data: UserLoginRequest) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email })
    .select("+password")
    .populate({ path: "roles", populate: { path: "permissions" } });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const roleNames = user.roles?.map((role: any) => role.name) ?? [];
  const permissions = (user.roles ?? [])
    .flatMap((role: any) => role.permissions ?? [])
    .map((permission: any) => permission.name);
  const uniquePermissions = Array.from(new Set(permissions));

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    roles: roleNames,
    permissions: uniquePermissions,
  });

  const refreshToken = generateRefreshToken({
    id: user._id.toString(),
    email: user.email,
  });

  const decoded = jwt.decode(refreshToken) as { exp: number };
  const expiresAt = new Date(decoded.exp * 1000);

  await SessionModel.create({ userId: user._id, refreshToken, expiresAt });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: roleNames,
      permissions: uniquePermissions,
    },
  };
};

export const logout = async (refreshToken: string) => {
  await SessionModel.findOneAndDelete({ refreshToken });
};

export const generateAccessTokenBasedOnRefreshToken = async (
  refreshToken: string,
) => {
  const session = await SessionModel.findOne({ refreshToken });
  if (!session) throw new Error("Invalid refresh token");

  const user = await UserModel.findById(session.userId).populate({
    path: "roles",
    populate: { path: "permissions" },
  });
  if (!user) throw new Error("User not found");

  const roleNames = user.roles?.map((role: any) => role.name) ?? [];
  const permissions = (user.roles ?? [])
    .flatMap((role: any) => role.permissions ?? [])
    .map((permission: any) => permission.name);
  const uniquePermissions = Array.from(new Set(permissions));

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    roles: roleNames,
    permissions: uniquePermissions,
  });

  return { accessToken };
};
