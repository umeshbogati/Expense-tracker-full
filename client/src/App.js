import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import Router from './Router';
import { clearTokens } from './utils/token';
import { fetchMe } from './store/slices/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userId, loading } = useAppSelector(state => state.auth);
    const user = useAppSelector(state => userId ? state.users.users[userId] : undefined);
    useEffect(() => {
        if (userId && !user) {
            dispatch(fetchMe(userId));
        }
    }, [dispatch, user, userId]);
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            clearTokens();
            navigate("/login");
        }
    }, [loading, isAuthenticated, navigate]);
    if (loading) {
        return _jsx(CircularProgress, {});
    }
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Router, {}), _jsx(ToastContainer, { position: 'top-right', autoClose: 4000, hideProgressBar: false })] }));
}
export default App;
