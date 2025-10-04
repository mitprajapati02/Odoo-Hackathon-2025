import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Buttons */}
      <div className="top-buttons">
        <button className="btn">Upload</button>
        <button className="btn" onClick={() => navigate("/employeeForm")}>
          New
        </button>
      </div>

      {/* Summary */}
      <div className="summary">
        <div className="box to-submit">
          <p>
            {expenses
              .filter((e) => e.status === "To Submit")
              .reduce((sum, e) => sum + parseInt(e.amount), 0)}{" "}
            rs
          </p>
          <span>To Submit</span>
        </div>
        <div className="box waiting">
          <p>
            {expenses
              .filter((e) => e.status === "Waiting Approval")
              .reduce((sum, e) => sum + parseInt(e.amount), 0)}{" "}
            rs
          </p>
          <span>Waiting Approval</span>
        </div>
        <div className="box approved">
          <p>
            {expenses
              .filter((e) => e.status === "Approved")
              .reduce((sum, e) => sum + parseInt(e.amount), 0)}{" "}
            rs
          </p>
          <span>Approved</span>
        </div>
      </div>

      {/* Expense Table */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Paid By</th>
            <th>Remarks</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.employee}</td>
              <td>{exp.description}</td>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>{exp.paidBy}</td>
              <td>{exp.remarks}</td>
              <td>{exp.amount}</td>
              <td className={`status ${exp.status.toLowerCase()}`}>
                {exp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
