import { useState } from "react";
import { AppBar, Avatar, Box, Button, Divider, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logoutUser } from "../store/slices/authSlice";
import appPermissions from "../constants/appPermissions";
import appRoles from "../constants/appRoles";

const ADMIN_PERMISSIONS = [
    appPermissions.CREATE_ROLES.name,
    appPermissions.VIEW_ROLES.name,
    appPermissions.CREATE_PERMISSIONS.name,
    appPermissions.VIEW_PERMISSIONS.name,
    appPermissions.CREATE_CATEGORIES.name,
    appPermissions.UPDATE_CATEGORIES.name,
    appPermissions.DELETE_CATEGORIES.name,
    appPermissions.MANAGE_USERS.name,
];

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, refreshToken, permissions, roles, userId } = useAppSelector(state => state.auth);
    const user = useAppSelector(state => userId ? state.users.users[userId] : undefined);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);
    const isAdmin = isSuperAdmin || ADMIN_PERMISSIONS.some(p => permissions.includes(p));

    const handleLogout = () => {
        setAnchorEl(null);
        if (refreshToken) dispatch(logoutUser({ refreshToken }));
        navigate("/");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const displayName = (user as any)?.name ?? "Account";
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ cursor: "pointer", mr: 3 }}
                    onClick={() => navigate("/")}
                >
                    Expense Tracker
                </Typography>

                {isAuthenticated && (
                    <Button color="inherit" onClick={() => navigate("/transactions")}>
                        Transactions
                    </Button>
                )}

                <Box sx={{ flexGrow: 1 }} />

                {!isAuthenticated ? (
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
                        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center" gap={1}>
                        {isAdmin && (
                            <Button color="inherit" onClick={() => navigate("/admin")}>
                                Admin Actions
                            </Button>
                        )}

                        <Avatar
                            sx={{ width: 34, height: 34, cursor: "pointer", bgcolor: "secondary.main", fontSize: 13 }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            {initials}
                        </Avatar>

                        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                            <MenuItem disabled sx={{ opacity: 1 }}>
                                <Typography variant="body2" fontWeight={600}>{displayName}</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => { setAnchorEl(null); navigate("/profile"); }}>
                                View Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;