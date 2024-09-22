# FronEnd Task Assignment Management System.

A full-stack **Task Assignment Management** web application built using **React.js** for the frontend, with user authentication and authorization. The system allows administrators to manage users, supervisors to manage tasks, and employees to view their assigned tasks.

## You can check the page at the following URL:
- **Live URL**: [Task Assignment System](https://lively-sea-0c48f3010.5.azurestaticapps.net/login)

### Test Users:
- **Administrator**:
  - Email: `admin@gmail.com`
  - Password: `admin`

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Deployment on Azure](#deployment-on-azure)

## Features

- **Authentication**: User login with JWT-based authentication.
- **User Administrator**: Administrator can create, edit, delete users and tasks.
- **User Supervisor**: Supervisor can assign tasks to employees and change the status of tasks.
- **User Employee**: Employee can view his assigned tasks and update their status.
- **Task Management**: CRUD (Create, Read, Update, Delete) of tasks. Assigning tasks to users ○ Updating the status of tasks (Pending, In Process, Completed).
- **User Management**: CRUD of users ○ Assignment of roles to users.
- **Role-Based Access**: Admin, Supervisor, and Employee roles with restricted routes.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: User-friendly error modals for operations like task deletion failures.

## Technologies Used

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - React Router DOM
  - React Hook Form
- **Backend (assumed)**: 
  - .Net 8.0
  - Entity Framework Core
  - SQL Server (adjust based on your implementation)
  - JWT (for authentication)
- **Miscellaneous**:
  - React Context API (for global state management)
  - Axios (for API requests)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 22.7.x or higher)
- **npm** or **yarn**

### Step-by-step guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FabianPala99/FrontEndTaskAssignment.git
   
2. **Install dependencies:**
   ```bash
   npm install

3. **Run the development server::**
   ```bash
   npm run dev
## Deployment on Azure

This project has been deployed on Azure for scalability and reliability. The frontend is hosted using **Azure Static Web Apps**.

### Steps to deploy on Azure

1. **Azure Static Web Apps**: Deploy your React application using **Azure Static Web Apps service**. Use the build output from npm run build to deploy.

2. **Continuous Deployment**: Set up GitHub Actions or Azure Pipelines for automated deployment..
