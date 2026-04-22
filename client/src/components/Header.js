import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router";
export default function Header() {
    return (_jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(Link, { to: "/", children: _jsx(Button, { color: "inherit", style: {
                                color: "white",
                            }, children: "Home" }) }), _jsxs(Box, { children: [_jsx(Link, { to: "/login", children: _jsx(Button, { color: "inherit", style: {
                                        color: "white",
                                    }, children: "Login" }) }), _jsx(Link, { to: "/register", children: _jsx(Button, { color: "inherit", style: {
                                        color: "white",
                                    }, children: "Register" }) })] })] }) }) }));
}
