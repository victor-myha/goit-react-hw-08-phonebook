import { Route, Routes, useNavigate } from 'react-router-dom';
import Contacts from './Contacts/Contacts';
import { Error404 } from './Error404/Error404';
import Login from './Login/Login';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import PrivateRoute from '../common/PrivateRoute/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    dispatch(setUser(JSON.parse(user)));
    console.log('User', user);
    if (user) navigate('/contacts');
    else navigate('/login');
  }, [dispatch, navigate]);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<div />} />

        <Route path={'/contacts'}
               element={<PrivateRoute child={<Contacts />} />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  );
};
