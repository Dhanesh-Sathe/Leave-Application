import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is not logged in or token is invalid
  if (!user) {
    localStorage.clear(); // Clear any invalid data
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
