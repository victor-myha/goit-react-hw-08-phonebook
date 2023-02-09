import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const ProtectedRoutes = ({ isSecured = false, element }) => {
  const token = useSelector(state => state.userSlice.user?.token);

  const isAuthorized = useMemo(() => {
    return Boolean(token);
  }, [token]);

  if (isSecured && !isAuthorized) return <Navigate to={'/login'} />;
  if (!isSecured && isAuthorized) return <Navigate to={'/contacts'} />;
  return element;
};

ProtectedRoutes.propTypes = {
  isSecured: PropTypes.bool,
  element: PropTypes.element.isRequired,
};
export default ProtectedRoutes;
