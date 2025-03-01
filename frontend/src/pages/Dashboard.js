import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Welcome, {user ? user.name : "!"}</h1>
      <Link className="btn btn-primary my-2" to="/new-expense">New Expense</Link>
      <Link className="btn btn-warning my-2" to="/expense-list">Expense List</Link>
    </div>
  );
};

export default Dashboard;
