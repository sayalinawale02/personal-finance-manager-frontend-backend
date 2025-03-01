import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }, [user, registeredUsers]);

  const signup = (email, password) => {
    if (registeredUsers[email]) {
      alert("User already exists! Please log in.");
      return false;
    }

    const updatedUsers = { ...registeredUsers, [email]: password };
    setRegisteredUsers(updatedUsers);
    alert("Signup successful! Please log in.");
    navigate("/login");
    return true;
  };

  const login = (email, password) => {
    if (!registeredUsers[email]) {
      alert("No account found! Please sign up first.");
      return false;
    }
    if (registeredUsers[email] !== password) {
      alert("Incorrect password!");
      return false;
    }

    setUser({ email });
    navigate("/home");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
