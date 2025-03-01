import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  return (
    <div className="container text-center">
      <h2>Welcome to your Expense Dashboard</h2>
    </div>
  );
};

export default Home;
