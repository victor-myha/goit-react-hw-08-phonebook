import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Contacts from '../../components/Contacts/Contacts';
import { useSelector } from 'react-redux';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { Error404 } from '../../components/Error404/Error404';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userSlice.user?.token);

  useEffect(() => {
    navigate('/');
  }, [token]);

  return (
    <>
      <Routes>
        {
          token ? (
            <>
              <Route path={'/'} element={<Navigate to={'/contacts'} />} />
              <Route path={'/contacts'} element={<Contacts />} />
              <Route path='*' element={<Error404 />} />
            </>
          ) : (
            <>
              <Route path={'/'} element={<Navigate to={'/login'} />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path='*' element={<Error404 />} />
            </>
          )
        }
      </Routes>
    </>
  );
};

export default ProtectedRoutes;
