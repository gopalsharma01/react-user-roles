import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="mb-3">
          <Link to="/" className="btn btn-outline-primary me-2">Users</Link>
          <Link to="/create" className="btn btn-outline-success">Create User</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;