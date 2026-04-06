import jwt from "jsonwebtoken";
// import { IUser } from "../models/UserModel";
import { config } from "../config";
// import { UserWithRolesAndPermission } from "../interfaces/user";

export interface AccessTokenPayload {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(
    {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
      permissions: payload.permissions,
    },
    config.JWT_SECRET,
    { expiresIn: "1hrs" },
  );
};

export const generateRefreshToken = (payload: {
  id: string;
  email: string;
}) => {
  return jwt.sign(
    {
      userId: payload.id,
      email: payload.email,
    },
    config.JWT_REFRESH_SECRET,
    { expiresIn: "30d" },
  );
};
