import Navigation from './Navigation/Navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import ProtectedRoutes from '../common/Routes/ProtectedRoutes';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    dispatch(setUser(JSON.parse(user)));
    console.log('User', user);
  }, [dispatch]);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <ProtectedRoutes />
    </div>
  );
};
