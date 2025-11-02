import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // No authentication check - just allow access
  // If no user, show login page (for better UX)
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

