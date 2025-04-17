
import { getUserProfile, setToken } from '@/redux/features/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router.jsx';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(getUserProfile());
    }
  }, [dispatch]);


  return (
    <Router />
  );
}


export default App
