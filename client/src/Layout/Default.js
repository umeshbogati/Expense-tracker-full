import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import Header from "../components/Header";
export default function Default() {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(Outlet, {})] }));
}
