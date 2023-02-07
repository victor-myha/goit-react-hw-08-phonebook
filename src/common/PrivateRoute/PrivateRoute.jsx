import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ child }) => {
  const token = useSelector((state) => state.userSlice.user?.token);
  if (!token) return <Navigate to={'/react-homework-template/login'} />;
  return child;
};

PrivateRoute.propTypes = {
  child: PropTypes.element.isRequired,
};

export default PrivateRoute;
