import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import EmployeeSubmission from './pages/EmployeeSubmission.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
// Correct import for the new ManagerDashboard component
import ManagerDashboard from './pages/ManagerDashboard.jsx' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employeeForm" element={<EmployeeSubmission />} />
        {/* The ManagerDashboard route is correctly defined here */}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App
