import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type PrivateRouteProps = {
  outlet: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ outlet }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? outlet : <Navigate to="/login" />;
};

export default PrivateRoute;
