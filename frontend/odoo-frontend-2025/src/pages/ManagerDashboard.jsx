import React, { useState, useEffect } from 'react';
// Assuming Firebase setup is handled in a context or dedicated file elsewhere
// For demonstration, we'll include minimal functional code

const ManagerDashboard = () => {
  // Mock data for approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, employee: 'Alice Johnson', type: 'Expense Report', amount: '$150.00', status: 'Pending' },
    { id: 2, employee: 'Bob Smith', type: 'Time Off Request', duration: '3 Days (Dec 1-3)', status: 'Pending' },
  ]);

  useEffect(() => {
    // In a real application, you would fetch data here
    // e.g., fetchPendingApprovals(auth.currentUser.uid).then(setPendingApprovals);
    console.log('Manager Dashboard loaded. Fetching approvals...');
  }, []);

  const handleApproval = (id) => {
    console.log(`Approving item ${id}`);
    setPendingApprovals(pendingApprovals.filter(item => item.id !== id));
    // API call to approve item
  };

  const handleRejection = (id) => {
    console.log(`Rejecting item ${id}`);
    setPendingApprovals(pendingApprovals.filter(item => item.id !== id));
    // API call to reject item
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700">Manager Dashboard</h1>
          <p className="text-gray-500">Review and manage employee submissions and requests.</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Approvals ({pendingApprovals.length})</h2>
          
          <div className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <div className="p-6 bg-white rounded-xl shadow-lg border border-green-200">
                <p className="text-lg text-green-600 font-medium">🎉 All caught up! No pending approvals at this time.</p>
              </div>
            ) : (
              pendingApprovals.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center transition duration-300 ease-in-out hover:shadow-xl">
                  
                  <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                    <p className="text-lg font-medium text-gray-900 truncate">{item.employee} - {item.type}</p>
                    {item.amount && <p className="text-sm text-gray-600 font-bold">{item.amount}</p>}
                    {item.duration && <p className="text-sm text-gray-600">{item.duration}</p>}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApproval(item.id)}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejection(item.id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Employee Performance</h3>
            <p className="text-gray-600">View performance reviews and goal progress across the team.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition">
                View Performance Reports &rarr;
            </button>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Team Utilities</h3>
            <p className="text-gray-600">Access rules, guidelines, and company policy documents.</p>
             <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition">
                View Policy Documents &rarr;
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ManagerDashboard;
