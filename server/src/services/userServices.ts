import mongoose from "mongoose";
import UserModel from "../models/UserModel";
import RoleModel from "../models/RoleModel";

export const getAll = async () => {
  return await UserModel.find({}).populate({
    path: "roles",
    populate: {
      path: "permissions",
    },
  });
};

export const getById = async (userId: string) => {
  const user = await UserModel.findById(userId).populate({
    path: "roles",
    populate: {
      path: "permissions",
    },
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const assignRolesToUser = async (userId: string, roleIds: string[]) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const roles = await RoleModel.find({ _id: { $in: roleIds } });
  if (roles.length !== roleIds.length) {
    throw new Error("One or more roles do not exist");
  }

  const currentRoleIds = user.roles?.map((roleId) => roleId.toString()) ?? [];
  const mergedRoleIds = Array.from(new Set([...currentRoleIds, ...roleIds]));
  user.roles = mergedRoleIds.map((id) => new mongoose.Types.ObjectId(id));
  await user.save();

  return await getById(userId);
};

export const removeRoleFromUser = async (userId: string, roleId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  user.roles = (user.roles ?? []).filter(
    (currentRoleId) => currentRoleId.toString() !== roleId,
  );
  await user.save();

  return await getById(userId);
};
