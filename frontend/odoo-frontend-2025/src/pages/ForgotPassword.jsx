import React, { useState } from "react";
import axios from "axios";
import "../styles/forgotpassword.css"; // CSS file for styling

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        tempPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/forgot-password", formData);
            alert(res.data.message);
            setFormData({ email: "", tempPassword: "", newPassword: "" });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error updating password");
        }
    };

    return (
        <div className="forgot-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="tempPassword"
                    placeholder="Temporary Password from Email"
                    value={formData.tempPassword}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Update Password</button>
            </form>
        </div>
    );
}
