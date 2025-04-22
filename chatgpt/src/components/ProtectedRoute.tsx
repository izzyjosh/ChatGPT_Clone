import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.ts";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProp {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
