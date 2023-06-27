import { useEffect } from "react";
import Task from "./components/Tasks/Task";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx/Navbar";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />}
        />
        <Route
          path="/tasks"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Task />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
