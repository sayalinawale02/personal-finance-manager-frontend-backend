import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const NewExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Load saved expenses from localStorage when the component mounts
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const handleAddExpense = () => {
    const trimmedTitle = title.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedTitle || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid expense title and amount greater than zero.");
      return;
    }

    const newExpense = { title: trimmedTitle, amount: parsedAmount };
    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setTitle("");
    setAmount("");

    // Optional: Redirect to the expense list after adding
    navigate("/expense-list");
  };

  return (
    <div className="container">
      <h2 className="text-center">Add New Expense</h2>
      
      <input
        type="text"
        className="form-control my-2"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <input
        type="number"
        className="form-control my-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      
      <button className="btn btn-primary w-100 my-2" onClick={handleAddExpense}>
        Add Expense
      </button>

      <h3 className="text-center mt-4">Expense Overview</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NewExpense;
