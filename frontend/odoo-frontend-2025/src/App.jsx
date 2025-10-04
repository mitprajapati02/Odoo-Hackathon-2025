import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard'
import ForgotPassword from './pages/ForgotPassword'
import EmployeeSubmission from './pages/EmployeeSubmission'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminView from './pages/AdminView'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employeeForm" element={<EmployeeSubmission />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-view" element={<AdminView />} />

      </Routes>
    </Router>
  )
}


export default App
