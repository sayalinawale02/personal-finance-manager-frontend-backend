import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewExpense from "./pages/NewExpense";
import ExpenseList from "./pages/ExpenseList";

import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/new-expense" element={<ProtectedRoute><NewExpense /></ProtectedRoute>} />
        <Route path="/expense-list" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
