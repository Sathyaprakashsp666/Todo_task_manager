import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
      .then(() => {
        enqueueSnackbar("Login success", {variant:"success"});
        navigate("/login");
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar("something went wrong!", {variant:"error"});
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
