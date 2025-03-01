import React, { useEffect, useState } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  // Function to handle delete
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Function to handle edit button click
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditTitle(expenses[index].title);
    setEditAmount(String(expenses[index].amount));
  };

  // Function to save the updated expense
  const handleSaveEdit = () => {
    if (editTitle.trim() === "" || String(editAmount).trim() === "") {
      alert("Please enter valid details.");
      return;
    }

    if (Number(editAmount) < 0) {
      alert("Amount cannot be negative.");
      return;
    }

    const updatedExpenses = [...expenses];
    updatedExpenses[editingIndex] = { title: editTitle, amount: Number(editAmount) };

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setEditingIndex(null);
    setEditTitle("");
    setEditAmount("");
  };

  return (
    <div className="container">
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul className="list-group">
          {expenses.map((expense, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {editingIndex === index ? (
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="form-control"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="form-control"
                  />
                  <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <>
                  <span>{expense.title}</span>
                  <strong>₹{expense.amount}</strong>
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
