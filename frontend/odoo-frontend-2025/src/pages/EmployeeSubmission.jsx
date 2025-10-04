import React, { useState, useRef } from 'react';
import "../styles/employeeSubmission.css";

// SVG Icon for the upload button
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} width={24} height={24}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

// Main App Component
export default function App() {
    // State for form fields
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Travel');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [paidBy, setPaidBy] = useState('');
    const [remarks, setRemarks] = useState('');
    const [receipt, setReceipt] = useState(null);

    // State for notification
    const [showNotification, setShowNotification] = useState(false);

    // Ref for the file input
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setReceipt(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("employee", "Prayesh Patel"); // hardcoded for now, can be dynamic
        formData.append("description", description);
        formData.append("category", category);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("paidBy", paidBy);
        formData.append("remarks", remarks);
        if (receipt) {
            formData.append("receipt", receipt);
        }

        try {
            const res = await fetch("http://localhost:5000/api/expenses", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("✅ Expense Saved:", data);

            if (res.ok) {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            }
        } catch (error) {
            console.error("❌ Error saving expense:", error);
        }

        // reset form fields
        setDescription("");
        setCategory("Travel");
        setAmount("");
        setCurrency("USD");
        setPaidBy("");
        setRemarks("");
        setReceipt(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    return (
        <div className="bg-gray-900 text-gray-200 flex items-center justify-center min-h-screen p-4 font-sans">
            <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Submit Expense</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="font-semibold text-white">Draft</span>
                        <span>&gt;</span>
                        <span>Waiting approval</span>
                        <span>&gt;</span>
                        <span>Approved</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Left Column */}
                        <div className="flex flex-col space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Attach Receipt</label>
                                <button type="button" onClick={() => fileInputRef.current.click()} className="w-full text-center py-3 px-4 border-2 border-dashed border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors duration-300">
                                    <UploadIcon />
                                    <span>{receipt ? receipt.name : 'Click to upload a file'}</span>
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Team Lunch" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300">
                                    <option>Travel</option>
                                    <option>Food & Dining</option>
                                    <option>Office Supplies</option>
                                    <option>Software</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">Total amount</label>
                                <div className="flex">
                                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="567.00" className="w-2/3 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" required />
                                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-1/3 bg-gray-700 border-t border-b border-r border-gray-600 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300">
                                        <option>USD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                        <option>JPY</option>
                                        <option>INR</option>
                                    </select>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Submit in the currency of the receipt. It will be auto-converted for approval.</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col space-y-6">
                            <div>
                                <label htmlFor="paid-by" className="block text-sm font-medium text-gray-400 mb-2">Paid by</label>
                                <input type="text" id="paid-by" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} placeholder="e.g., Hard Patel" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" required />
                            </div>
                            <div>
                                <label htmlFor="remarks" className="block text-sm font-medium text-gray-400 mb-2">Remarks</label>
                                <textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="6" placeholder="Any additional notes..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Approval History */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-white mb-4">Approval History</h2>
                        <div className="overflow-x-auto bg-gray-900/50 rounded-lg border border-gray-700">
                            <table className="min-w-full text-sm text-left">
                                <thead className="border-b border-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-medium text-gray-400">Approver</th>
                                        <th scope="col" className="px-6 py-3 font-medium text-gray-400">Status</th>
                                        <th scope="col" className="px-6 py-3 font-medium text-gray-400">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                                        <td className="px-6 py-4">Sarah</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">Approved</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">12:44 4th Oct, 2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 pt-6 border-t border-gray-700 flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105">
                            Submit
                        </button>
                    </div>
                </form>

                {/* Notification */}
                {showNotification && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300 animate-pulse">
                        Form submitted successfully!
                    </div>
                )}
            </div>
        </div>
    );
}
