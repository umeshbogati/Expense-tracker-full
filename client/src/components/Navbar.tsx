import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logoutUser } from "../store/slices/authSlice";
import appPermissions from "../constants/appPermissions";
import appRoles from "../constants/appRoles";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, refreshToken, permissions, roles } = useAppSelector(state => state.auth);

    const handleLogout = async () => {
        if (refreshToken) {
          await  dispatch(logoutUser({ refreshToken }));
          navigate("/login");
        }
    };

    const doesUserHaveViewPermission = roles.includes(appRoles.SUPER_ADMIN.name) || permissions.includes(appPermissions.VIEW_USERS.name);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Expense Tracker
                </Typography>
                <Box>
                    {!isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                            <Button color="inherit" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                        { doesUserHaveViewPermission && 
                            <Button color="inherit" onClick={() => navigate("/all-users")}>View All Users</Button>
                        }
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button> 
                        </>
                       
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;