import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import "./Navbar.css";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    enqueueSnackbar("Logged out successfully", { variant: "success" });

    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div>
        <h1 className="nav-title">Task Manager</h1>
      </div>

      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <span>{`Welcome, ${username}`}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
