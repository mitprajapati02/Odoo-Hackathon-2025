import React, { useState } from "react";
import "../styles/dashboard.css";

export default function AdminDashboard() {
    // mock local data (can later replace with backend API)
    const [users, setUsers] = useState([
        { id: 1, name: "Alice", role: "Manager", manager: "-", email: "alice@company.com" },
        { id: 2, name: "Bob", role: "Employee", manager: "Alice", email: "bob@company.com" },
        { id: 3, name: "Charlie", role: "Employee", manager: "Alice", email: "charlie@company.com" },
    ]);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", role: "Employee", manager: "", email: "" });

    const handleRoleChange = (id, newRole) => {
        const updated = users.map((user) =>
            user.id === id ? { ...user, role: newRole } : user
        );
        setUsers(updated);
        alert(`Role updated to ${newRole} for user ID: ${id}`);
    };

    const handleManagerChange = (id, newManager) => {
        const updated = users.map((user) =>
            user.id === id ? { ...user, manager: newManager } : user
        );
        setUsers(updated);
        alert(`Manager updated to ${newManager} for user ID: ${id}`);
    };

    const handleSendPassword = (email) => {
        const randomPass = Math.random().toString(36).slice(-8);
        alert(`Generated password "${randomPass}" sent to ${email}`);
        // Later: send backend request to mail password
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
    };

    const handleSaveNew = () => {
        if (!newUser.name || !newUser.email) {
            alert("Please fill all fields");
            return;
        }
        const newId = users.length + 1;
        setUsers([...users, { id: newId, ...newUser }]);
        setNewUser({ name: "", role: "Employee", manager: "", email: "" });
        setIsAddingNew(false);
        alert("New user added!");
    };

    return (
        <div className="dashboard-container">
            <div className="top-bar">
                <button className="new-btn" onClick={handleAddNew}>+ New</button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Manager</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>

                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </td>

                            <td>
                                {user.role === "Employee" ? (
                                    <select
                                        value={user.manager}
                                        onChange={(e) => handleManagerChange(user.id, e.target.value)}
                                    >
                                        <option value="-">Select Manager</option>
                                        {users
                                            .filter((u) => u.role === "Manager")
                                            .map((m) => (
                                                <option key={m.id} value={m.name}>
                                                    {m.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td>{user.email}</td>

                            <td>
                                <button
                                    className="send-btn"
                                    onClick={() => handleSendPassword(user.email)}
                                >
                                    Send Password
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/* Row for adding new user */}
                    {isAddingNew && (
                        <tr className="new-row">
                            <td>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, name: e.target.value })
                                    }
                                />
                            </td>

                            <td>
                                <select
                                    value={newUser.role}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, role: e.target.value })
                                    }
                                >
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </td>

                            <td>
                                {newUser.role === "Employee" ? (
                                    <select
                                        value={newUser.manager}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, manager: e.target.value })
                                        }
                                    >
                                        <option value="">Select Manager</option>
                                        {users
                                            .filter((u) => u.role === "Manager")
                                            .map((m) => (
                                                <option key={m.id} value={m.name}>
                                                    {m.name}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                />
                            </td>

                            <td>
                                <button className="save-btn" onClick={handleSaveNew}>
                                    Save
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
