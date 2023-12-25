import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};

export default useAuth;
