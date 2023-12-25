import { Container } from "react-bootstrap";
import "./Register.scss";
import AuthForm from "../../components/AuthForm/AuthForm";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Loader from "../../components/Loader/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export type registerProps = {
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to="/" />;

  const register = (requestBody: registerProps) => {
    const postRequest = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse = await axios.post(
          `/api/register`,
          requestBody
        );
        if (response.status === 200) {
          alert("Registered successfully! please login");
        } else {
          throw new Error("Invalid response");
        }
        setIsLoading(false);
        navigate("/login");
      } catch (err) {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
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
      <div className="register">
        {error && <h3 className="error">{error}</h3>}
        <h1 className="mb-3">Register</h1>
        <AuthForm callback={register} />
      </div>
    </Container>
  );
};

export default Register;
