import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/signup.css"; // CSS file for styling
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
    });

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all?fields=name,currencies")
            .then((res) => {
                const data = res.data
                    .map((c) => ({
                        name: c.name.common,
                        currency: Object.keys(c.currencies || {})[0] || "N/A",
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name)); // sort by name A–Z
                setCountries(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/auth/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                country: formData.country,
            });
            alert("User registered successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                country: "",
            });
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Error registering user");
        }
    };

    return (
        <div className="form-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Country</option>
                    {countries.map((c, index) => (
                        <option key={index} value={c.name}>
                            {c.name} ({c.currency})
                        </option>
                    ))}
                </select>

                <button type="submit">Register</button>
                <div className="login-footer">
                    <p>
                        have account?{" "}
                        <span onClick={() => navigate("/login")} className="link">
                            Log In
                        </span>
                    </p>
                    <p>
                        <span onClick={() => navigate("/forgot-password")} className="link">
                            Forgot Password?
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}
