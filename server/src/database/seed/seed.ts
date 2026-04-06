import mongoose from "mongoose";
import dotenv from "dotenv";
import PermissionModel from "../../models/PermissionModel";
import RoleModel from "../../models/RoleModel";
import UserModel from "../../models/UserModel";
import bcrypt from "bcrypt";
import appPermissions from "../../constants/permission";
import appRoles from "../../constants/roles";
import { NUMBER_OF_SALT_ROUNDS } from "../../constants/auth";

dotenv.config();

const seed = async () => {
  const mongoURI = process.env.MONGO_URI;
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
  const superAdminName = process.env.SUPER_ADMIN_NAME;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!superAdminEmail) {
    throw new Error("SUPER_ADMIN_EMAIL is not defined");
  }

  if (!superAdminPassword) {
    throw new Error("SUPER_ADMIN_PASSWORD is not defined");
  }

  if (!superAdminName) {
    throw new Error("SUPER_ADMIN_NAME is not defined");
  }

  //connect to MongoDB
  await mongoose.connect(mongoURI);
  console.log("Connected to DB for seeding");

  const permissionsList = [
    {
      name: appPermissions.CREATE_ROLES.name,
      description: appPermissions.CREATE_ROLES.description,
    },
    {
      name: appPermissions.VIEW_ROLES.name,
      description: appPermissions.VIEW_ROLES.description,
    },
    {
      name: appPermissions.UPDATE_ROLES.name,
      description: appPermissions.UPDATE_ROLES.description,
    },
    {
      name: appPermissions.DELETE_ROLES.name,
      description: appPermissions.DELETE_ROLES.description,
    },
    {
      name: appPermissions.CREATE_PERMISSIONS.name,
      description: appPermissions.CREATE_PERMISSIONS.description,
    },
    {
      name: appPermissions.VIEW_PERMISSIONS.name,
      description: appPermissions.VIEW_PERMISSIONS.description,
    },
    {
      name: appPermissions.UPDATE_PERMISSIONS.name,
      description: appPermissions.UPDATE_PERMISSIONS.description,
    },
    {
      name: appPermissions.DELETE_PERMISSIONS.name,
      description: appPermissions.DELETE_PERMISSIONS.description,
    },
    {
      name: appPermissions.MANAGE_USERS.name,
      description: appPermissions.MANAGE_USERS.description,
    },
    {
      name: appPermissions.VIEW_USERS.name,
      description: appPermissions.VIEW_USERS.description,
    },
    {
      name: appPermissions.UPDATE_USERS.name,
      description: appPermissions.UPDATE_USERS.description,
    },
    {
      name: appPermissions.DELETE_USERS.name,
      description: appPermissions.DELETE_USERS.description,
    },
  ];

  //Create permissions in the database

  const createPermissions = await Promise.all(
    permissionsList.map(async (perm) => {
      const existingPermission = await PermissionModel.findOne({
        name: perm.name,
      });

      if (existingPermission) {
        return existingPermission;
      }
      return PermissionModel.create({
        name: perm.name,
        description: perm.description,
      });
    }),
  );
  const roleList = [
    {
      name: appRoles.SUPER_ADMIN.name,
      description: appRoles.SUPER_ADMIN.description,
      permissions: createPermissions.map((perm) => perm._id),
    },
    {
      name: appRoles.ADMIN.name,
      description: appRoles.ADMIN.description,
      permissions: createPermissions.map((perm) => perm._id),
    },
  ];

  const createRoles = await Promise.all(
    roleList.map(async (role) => {
      const existingRole = await RoleModel.findOne({ name: role.name });

      if (existingRole) {
        existingRole.permissions = role.permissions;
        await existingRole.save();
        return existingRole;
      }

      return RoleModel.create({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    }),
  );

  //create super admin user if not exists
  const existingSuperAdmin = await UserModel.findOne({
    email: superAdminEmail,
  });

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash(
      superAdminPassword,
      NUMBER_OF_SALT_ROUNDS,
    );

    await UserModel.create({
      name: superAdminName,
      email: superAdminEmail,
      password: hashedPassword,
      roles: [createRoles[0]!._id], //Assign super admin role
    });
  }
  console.log("Setting completed");
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
  process.exit(1);
});
