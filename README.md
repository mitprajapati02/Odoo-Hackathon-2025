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
.
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
🚀 Expense Management System Startup GuideThis guide provides step-by-step instructions for getting the Expense Management System up and running locally. The project consists of a Node.js/Express backend and a React/Vite frontend.📋 PrerequisitesBefore you begin, ensure you have the following installed on your machine:Node.js & npm (or yarn): Essential for running both the backend and frontend. (v18+ recommended)Git: For cloning the repository.MongoDB Instance: You will need access to a MongoDB database (local installation or a cloud service like MongoDB Atlas).1. Backend SetupThe backend handles API requests, database interactions, and authentication.A. Navigate to the Backend DirectoryOpen your terminal and move into the backend folder:cd backend
B. Install DependenciesInstall all necessary Node.js packages:npm install
# or
yarn install
C. Configure Environment VariablesThe backend relies on environment variables for sensitive data like database connection strings and JWT secrets.Create a file named .env in the root of the backend directory (/backend/.env).Add the following required variables (fill in your actual values):# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
PORT=5000

# JWT Security
JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY
JWT_LIFETIME=30d

# Other Settings (e.g., for file uploads or email if implemented)
# UPLOAD_PATH=./uploads
D. Run the Backend ServerStart the Node.js server. The server will typically run on http://localhost:5000.npm run dev
# (Assuming your package.json has a 'dev' script defined for development)
# OR
npm start
2. Frontend SetupThe frontend is a React application built with Vite, located inside a nested directory.A. Navigate to the Frontend DirectoryReturn to the root directory and navigate to the client application folder:cd ../frontend/odoo-frontend-2025
B. Install DependenciesInstall the React and client-side packages:npm install
# or
yarn install
C. Run the Frontend ApplicationStart the React development server. It usually opens on port 3000 or 5173, as configured by Vite.npm run dev
# or
yarn dev
🎉 Success!Your application should now be running!Backend API: Running on http://localhost:5000 (or your configured port).Frontend App: Accessible in your browser at the address shown in your terminal (e.g., http://localhost:5173).You can now interact with the application, starting with the Sign Up (/) or Login (/login) page.