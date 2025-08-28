import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams  } from "react-router-dom";
import api from "../api/axios";
import PageLoader from "../components/PageLoader";

const defaultFormData = {full_name: "",email: "",roles: []};
const UserForm = () => {

  const { id } = useParams();
  const [formData, setFormData] = useState(defaultFormData);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({}); // store validation errors
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  const didRun = useRef(false);

  useEffect(()=>{
    if (didRun.current) return; // block 2nd call
    didRun.current = true;
    
    const fetchUserRoles = async () => {
      try {
        setPageLoading(true);
        const res = await api.get("/roles");  //async/await call
        setRoles(res.data.data ?? []);
        if(id){
          const uDataRes = await api.get(`/users/${id}`);
          let selectedUserRole = [];
          
          (uDataRes.data.data.roles).forEach((role,index)=>{
            selectedUserRole.push(role.id);
          });
          setFormData({full_name: uDataRes.data.data.name, email: uDataRes.data.data.email, roles:selectedUserRole })
        }
      } catch (err) {
        console.log(err)
        alert(err?.response?.data?.message);
      } finally {
        setPageLoading(false);
      }
    };
    fetchUserRoles();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      // Convert selected options into array
      const selectedRoles = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      updateFormData("roles",selectedRoles);
    } else {
      updateFormData(name,value);
    }
  };

  const resetFormData = (name,value) => {
    setFormData(defaultFormData);
  }
  const updateFormData = (name,value) => {
    setFormData({ ...formData, [name]: value });
  }

  const validate = () => {
    let newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.roles.length === 0) newErrors.roles = "Select at least one role.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); //start loading
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      const res = !id ? await createUser(formData) : await updateUser(formData);
      alert(res.data.message); //alert message
      resetFormData(); // reset form
      navigate("/"); // redirect to user list after success
    } catch (err) {
      if(err.response.data.errors){
        let newErrors = {};
        Object.keys(err.response.data.errors).forEach((item,index)=>{
          newErrors[item] = err.response.data.errors[item][0];
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  const createUser = async (formData) => {
    return await api.post("/users", formData);
  }

  const updateUser = async (formData) => {
    return await api.put(`/users/${id}`, formData);
  }
  return (
    <div className="card mb-3">
      {pageLoading && <PageLoader/>}
      <div className="card-header">Add User</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.full_name && (
              <div className="invalid-feedback">{errors.full_name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Multi Select Roles */}
          <div className="mb-3">
            <label className="form-label">Roles</label>
            <select
              multiple
              name="roles"
              className={`form-select ${errors.roles ? "is-invalid" : ""}`}
              value={formData.roles}
              onChange={handleChange}
            >
              {roles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roles && (
              <div className="invalid-feedback d-block">{errors.roles}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}  //disable while loading
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              "Save User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;