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
import EditTransaction from "./pages/EditTransaction";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<>Hello this is profile</>} />

            <Route
                path="/users"
                element={
                    <ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}>
                        <AllUsers />
                    </ProtectedRoute>
                }
            />
            <Route path="/users/:id" element={<ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}><UserPage /></ProtectedRoute>} />

            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/add" element={<AddTransaction />} />
            <Route path="/transactions/:id" element={<TransactionDetail />} />
            <Route path="/transactions/:id/edit" element={<EditTransaction />} />

            <Route path="/admin" element={<AdminPage />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
};

export default Router;