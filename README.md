# React Frontend for Laravel User & Roles API

This is the React frontend that interacts with the **Laravel 11 User & Roles API**.  
It allows creating users with multiple roles and listing them.

---

## 📋 Requirements
- **Node.js**
  - React 18 → Node.js >= 16.8.0
- **npm or yarn**
- Laravel API backend (must be running)

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gopalsharma01/react-user-roles.git
   cd react-user-roles
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---

## ⚙️ Environment Setup

Create a `.env` file in the root of your React project:

```env
# API Base URL
REACT_APP_API_URL=http://127.0.0.1:8000/api
REACT_APP_API_KEY=
```

> ⚠️ Make sure the Laravel backend is running on the same URL as defined above and use same API_KEY.

---

## 🚀 Run the Application

Start the React development server:
```bash
npm start
```

The app will run at:
```
http://localhost:3000
```

---

## 📌 Features

- User creation form (Full Name, Email, Roles)
- Role multi-select dropdown
- Validation error messages displayed on form
- List of users fetched from API
- Filtering users by role

---

## 🛠 API Endpoints Used

- **POST** `/api/users` → Create user
- **GET** `/api/users` → Fetch all users
- **GET** `/api/roles` → Fetch all roles for drop down
- **GET** `/api/users?role=1` → Fetch users by role

---

## 🏁 Summary

1. Install dependencies with `npm install`  
2. Set API base URL in `.env`  
3. Start React app with `npm start`  
4. Make sure Laravel backend is running  

Now your React frontend and Laravel backend are fully connected 🚀
