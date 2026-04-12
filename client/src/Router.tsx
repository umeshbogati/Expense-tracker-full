import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import appPermissions from "./constants/appPermissions";
import AllUsers from "./pages/AllUsers";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route 
                path="/all-users" 
                element={
                    <ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}>
                        <AllUsers />
                    </ProtectedRoute>
                } 
            />

            <Route path="/users/:id" element={<ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}><UserPage /></ProtectedRoute>} />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default Router;