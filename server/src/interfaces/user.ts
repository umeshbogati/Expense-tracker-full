export interface UserRegisterRequest  {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}
export interface AuthenticateUser {
    id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface Permission {
    id: string;
    name: string;
    description: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
}

export interface UserWithRolesAndPermission {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: Role[];
}