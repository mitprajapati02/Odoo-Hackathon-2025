# Expense Management Frontend (React)

This is the frontend for the **Expense Management System** built using React and React Router.  
It provides routes for authentication, admin dashboard, and employee functionalities.

---

## 🚀 Available Routes

| Path               | Component             | Description                                                                 | Accessible By |
|--------------------|-----------------------|-----------------------------------------------------------------------------|---------------|
| `/`                | **SignUp**            | Default route – User signs up by providing details to create an account.   | All users (new) |
| `/login`           | **Login**             | User login page (Admin, Manager, or Employee).                             | All users |
| `/forgot-password` | **ForgotPassword**    | Page for resetting password if the user forgets credentials.               | All users |
| `/admin`           | **AdminDashboard**    | Dashboard for Admin users. Provides access to company/approval management. | Admin only |
| `/employee`        | **EmployeeDashboard** | Dashboard for Employees. Shows submitted expenses and their status.        | Employee only |
| `/employeeForm`    | **EmployeeSubmission**| Form for employees to submit a new expense claim.                          | Employee only |
| `/manager`         | **ManagerDashboard**  | Dashboard for Managers. Shows team expenses and pending approvals.         | Manager only |


---

## 🛠️ Tech Stack
- **React** (Frontend framework)
- **React Router v6** (Routing)
- **Tailwind / CSS** (Styling, if applied)
- **Axios / Fetch** (For calling backend APIs)

---

## ▶️ Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/mitprajapati02/Odoo-Hackathon-2025.git
   cd expense-management-frontend


## Folder Structure 
```
├── README.md
├── backend
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── company.js
│   │   ├── expense.js
│   │   ├── rule.js
│   │   └── user.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── auth.js
│   │   ├── expenses.js
│   │   ├── rules.js
│   │   └── users.js
│   └── server.js
├── frontend
│   └── odoo-frontend-2025
│       ├── README.md
│       ├── dist
│       │   ├── assets
│       │   │   ├── index-CkBGqcwW.js
│       │   │   ├── index-D8b4DHJx.css
│       │   │   └── react-CHdo91hT.svg
│       │   ├── index.html
│       │   └── vite.svg
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   └── vite.svg
│       ├── src
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── assets
│       │   │   └── react.svg
│       │   ├── index.css
│       │   ├── main.jsx
│       │   ├── pages
│       │   │   ├── Login.jsx
│       │   │   └── SignUp.jsx
│       │   └── styles
│       │       ├── login.css
│       │       └── signup.css
│       └── vite.config.js
└── tree_structure.txt
```
