import React, { useState } from "react";
import "../styles/adminView.css";

export default function AdminView() {
    const [selectedManager, setSelectedManager] = useState("");
    const [isManagerApprover, setIsManagerApprover] = useState(false);
    const [approvers, setApprovers] = useState([
        { id: 1, name: "Alice", isSelected: true },
        { id: 2, name: "Bob", isSelected: false },
        { id: 3, name: "Charlie", isSelected: true },
        { id: 4, name: "David", isSelected: false },
    ]);
    const [minApproval, setMinApproval] = useState(60);

    const managers = ["Alice", "Eve", "Frank"];

    const handleApproverChange = (id) => {
        setApprovers((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, isSelected: !a.isSelected } : a
            )
        );
    };

    return (
        <div className="adminview-container">
            <h2 className="page-title">Admin - Approval Configuration</h2>

            <section className="user-section">
                <label className="field-label">User:</label>
                <input
                    type="text"
                    className="user-input"
                    value="Alice Johnson"
                    readOnly
                />
            </section>

            <section className="description-section">
                <p className="rules-desc">
                    Define approval flow for employees. Each user can have a
                    manager and additional approvers. Approvers are responsible
                    for reviewing submitted expenses. A minimum approval
                    percentage is required for final approval.
                </p>
            </section>

            <section className="manager-section">
                <label className="field-label">Select Manager:</label>
                <select
                    className="dropdown"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                >
                    <option value="">Select Manager</option>
                    {managers.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </section>

            <section className="approver-section">
                <div className="approver-header">
                    <label>
                        <input
                            type="checkbox"
                            checked={isManagerApprover}
                            onChange={() =>
                                setIsManagerApprover(!isManagerApprover)
                            }
                        />{" "}
                        Is Manager an Approver?
                    </label>
                </div>

                <table className="approver-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Required?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvers.map((approver) => (
                            <tr key={approver.id}>
                                <td>{approver.name}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={approver.isSelected}
                                        onChange={() =>
                                            handleApproverChange(approver.id)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="min-approval-section">
                    <label className="field-label">
                        Minimum Approval Percentage:
                    </label>
                    <input
                        type="number"
                        className="min-approval-input"
                        value={minApproval}
                        onChange={(e) => setMinApproval(e.target.value)}
                        min="0"
                        max="100"
                    />
                    <span>%</span>
                </div>
            </section>

            <button className="save-config-btn">Save Configuration</button>
        </div>
    );
}
