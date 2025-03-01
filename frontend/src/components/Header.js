import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header bg-primary text-white d-flex justify-content-between align-items-center px-3 py-2">
      <h4>PERSONAL EXPENSE MANAGER</h4>
      {user && <h5>Welcome, {user.email}</h5>}
    </header>
  );
};

export default Header;
