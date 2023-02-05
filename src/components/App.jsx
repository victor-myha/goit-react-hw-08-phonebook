import { Route, Routes } from 'react-router-dom';
import Contacts from './Contacts/Contacts';
import { Error404 } from './Error404/Error404';
import Login from './Login/Login';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import { useSelector } from 'react-redux';

export const App = () => {
  const uId = useSelector((state) => state.userSlice.user.uId);

  return (
    <div>
      <div>
        <Navigation uId={uId} />
      </div>
      <Routes>
        <Route path="/react-homework-template" element={<div />} />
        {uId && (
          <Route
            path="/react-homework-template/contacts"
            element={<Contacts uId={uId} />}
          />
        )}
        <Route
          path="/react-homework-template/register"
          element={<Register />}
        />
        <Route path="/react-homework-template/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};
