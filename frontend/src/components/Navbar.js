import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {user && user.email ? ( // Ensure user and user.email exist
        <div className="container-fluid d-flex justify-content-between w-100">
          <span className="navbar-brand">Welcome, {user.email}</span>
          <div>
            <Link className="btn btn-light mx-2" to="/new-expense">New Expense</Link>
            <Link className="btn btn-light mx-2" to="/expense-list">Expense List</Link>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="ml-auto">
          <Link className="btn btn-light mx-2" to="/login">Login</Link>
          <Link className="btn btn-light mx-2" to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
