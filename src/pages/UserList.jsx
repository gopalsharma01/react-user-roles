import React, { useState, useEffect, useRef } from "react";
import PageLoader from "../components/PageLoader";
import api from "../api/axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState(''); // default filter

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let filterUrl = '';
        if (roleFilter.length > 0) {
          filterUrl += `?role=${roleFilter}`;  // pass role filter in API
        }
        const res = await api.get("/users" + filterUrl);  // async/await call
        
        setUsers(res.data.data ?? []);
        setRoles(res.data.roles ?? [])
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [roleFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Management</h2>
      {loading && <PageLoader/>}
      <div className="card">
        <div className="card-header">User List</div>
        <div className="card-body">
          {/* Filter Dropdown */}
          <div className="mb-3">
            <label className="me-2">Filter by Role:</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-select w-auto d-inline"
            >
              <option value="">All</option>
              {roles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {/* UserList */}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <ul>
                        {user.roles.map((u) => (
                          <li key={u.id}>{u.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  );
};

export default UserList;