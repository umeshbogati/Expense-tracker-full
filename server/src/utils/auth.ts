import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";
import { config } from "../config";

export const generateAccessToken = (user : IUser) => {
    // Assignment_todo: Check whether JWT_SECRET is there or not (Need to create a function that checks against all required Secrets & does not open server if not present)

    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        }, // payload
        config.JWT_SECRET,
        { "expiresIn": "30m" }
    )
}


export const generateRefreshToken = (user : IUser) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        config.JWT_REFRESH_SECRET, // Assignment: Use different secret for creating refresh token
        { "expiresIn": "30d" }
    );
};