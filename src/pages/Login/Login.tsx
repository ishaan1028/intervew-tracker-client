import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Login.scss";
import Loader from "../../components/Loader/Loader";
import axios, { type AxiosResponse } from "axios";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export type loginProps = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to="/" />;

  const login = (requestBody: loginProps) => {
    const postRequest = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse = await axios.post(
          `/api/login`,
          requestBody
        );
        if (response.status === 200 && response.data) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user.username);
          setIsLoggedIn(true);
        } else {
          throw new Error("Invalid response");
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
          console.log(err);
          setError(err?.response?.data?.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      }
    };
    postRequest();
  };

  if (isLoading) return <Loader />;

  return (
    <Container>
      <div className="login">
        {error && <h3 className="error">{error}</h3>}
        <h1 className="mb-3">Login</h1>
        <AuthForm callback={login} />
      </div>
    </Container>
  );
};

export default Login;
