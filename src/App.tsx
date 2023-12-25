import axios from "axios";
import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  axios.defaults.baseURL = "https://interview-tracker-api.vercel.app";

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/interview" />} />
        <Route path="/interview" element={<PrivateRoute outlet={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
