import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css"; // CSS file for styling
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            // navigate to dashboard or homepage
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Invalid credentials or server error");
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
