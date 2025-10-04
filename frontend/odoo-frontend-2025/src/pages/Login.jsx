import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css"; // CSS file for styling
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Admin", // default selected
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            alert("Login successful!");
            console.log(res.data);

            // Navigate based on role
            if (formData.role === "Admin") navigate("/admin");
            else navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Invalid credentials or server error");
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome Back 👋</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ margin: "10px 0", padding: "10px", borderRadius: "6px", width: "100%" }}
                >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                </select>

                <button type="submit">Login</button>
            </form>

            <div className="login-footer">
                <p>
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="link">
                        Sign Up
                    </span>
                </p>
                <p>
                    <span onClick={() => navigate("/forgot-password")} className="link">
                        Forgot Password?
                    </span>
                </p>
            </div>
        </div>
    );
}
