import Navigation from './Navigation/Navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import ProtectedRoutes from '../common/Routes/ProtectedRoutes';
import { Route, Routes } from 'react-router-dom';
import { Error404 } from './Error404/Error404';
import Contacts from './Contacts/Contacts';
import Login from './Login/Login';
import Register from './Register/Register';

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
      <Routes>
        <Route path={'/login'} element={<ProtectedRoutes element={<Login />} />} />
        <Route path={'/register'} element={<ProtectedRoutes element={<Register />} />} />
        <Route path={'/contacts'} element={<ProtectedRoutes isSecured element={<Contacts />} />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </div>
  );
};
