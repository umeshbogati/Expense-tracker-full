import { CircularProgress } from '@mui/material';
import './App.css'
import Navbar from './components/Navbar'
import { useAppDispatch, useAppSelector } from './hooks/storeHooks'
import Router from './Router'
import { clearTokens } from './utils/token';
import { fetchMe } from './store/slices/userSlice';
import { useEffect } from 'react';
import { useNavigate }from 'react-router';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userId, loading } = useAppSelector(state => state.auth);
  const user = useAppSelector(state => userId ? state.users.users[userId] : undefined);

  useEffect(() => {
    if (userId && !user )  {
      dispatch(fetchMe(userId))
    }
  }, [dispatch,user, userId])

  

  useEffect(() => {
    if (!loading && !isAuthenticated) {
    clearTokens();
    navigate("/login");
  } 
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Navbar />

      {user && <h1>Welcome {user.name}</h1>}

      <Router />
    </>
  )
}

export default App