import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.ts";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  
  

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
