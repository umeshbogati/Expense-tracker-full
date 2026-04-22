import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import appPermissions from "./constants/appPermissions";
import AllUsers from "./pages/AllUsers";
import UserPage from "./pages/UserPage";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/transactions";
import TransactionDetail from "./pages/TransactionDetail";
import AdminPage from "./pages/admin/AdminPage";
const Router = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/profile", element: _jsx(_Fragment, { children: "Hello this is profile" }) }), _jsx(Route, { path: "/users", element: _jsx(ProtectedRoute, { requiredPermissions: [appPermissions.VIEW_USERS.name], children: _jsx(AllUsers, {}) }) }), _jsx(Route, { path: "/users/:id", element: _jsx(ProtectedRoute, { requiredPermissions: [appPermissions.VIEW_USERS.name], children: _jsx(UserPage, {}) }) }), _jsx(Route, { path: "/transactions", element: _jsx(Transactions, {}) }), _jsx(Route, { path: "/transactions/add", element: _jsx(AddTransaction, {}) }), _jsx(Route, { path: "/transactions/:id", element: _jsx(TransactionDetail, {}) }), _jsx(Route, { path: "/transactions/:id/edit", element: _jsx(AddTransaction, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }), _jsx(Route, { path: "*", element: _jsx("h1", { children: "404 Not Found" }) })] }));
};
export default Router;
