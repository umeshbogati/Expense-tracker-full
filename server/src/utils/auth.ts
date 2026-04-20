import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";
import { config } from "../config";
import { UserWithRolesAndPermission } from "../interfaces/user";

export const generateAccessToken = (user : UserWithRolesAndPermission, roles?: string[], permissions?: string[] ) => {
    // Assignment_todo: Check whether JWT_SECRET is there or not (Need to create a function that checks against all required Secrets & does not open server if not present)

    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            roles,
            permissions
        }, // payload
        config.JWT_SECRET,
        { "expiresIn": "3d" }
    )
}


export const generateRefreshToken = (user : UserWithRolesAndPermission) => {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        config.JWT_SECRET, // Assignment: Use different secret for creating refresh token
        { "expiresIn": "30d" }
    )
}