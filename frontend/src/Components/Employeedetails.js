import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById, updateEmployee } from '../api';

function Employeedetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empdetails, setEmpDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchEmployeesById = async () => {
    try {
      const { data } = await GetEmployeeById(id);
      setEmpDetails(data);
      setFormData({ ...data }); // Initialize formData with fetched data
    } catch (err) {
      notify('Failed to fetch employee, try again later', 'error');
    }
  };

  useEffect(() => {
    fetchEmployeesById();
  }, [id]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the employee
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await updateEmployee(id, formData);
      if (success) {
        notify(message, 'success');
        setEmpDetails(formData); // Update the details in state after saving
        setIsEditing(false); // Exit edit mode
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      notify('Failed to update employee, try again later', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center text-primary">Employee Details</h3>
      {empdetails ? (
        <div className="card shadow-lg rounded-lg border-0">
          <div className="card-body">
            <div className="row">
              {/* Profile Image Section */}
              <div className="col-md-4 text-center">
                <img
                  src={empdetails.profileImage}
                  alt={`${empdetails.name}'s profile`}
                  className="img-fluid rounded-circle mb-3"
                  style={{ maxWidth: '180px', border: '4px solid #007bff' }}
                />
              </div>
              {/* Details Section */}
              <div className="col-md-8">
                {isEditing ? (
                  <form onSubmit={handleSaveChanges}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Salary</label>
                      <input
                        type="text"
                        className="form-control"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="profileImage"
                        onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </form>
                ) : (
                  <>
                    <h4 className="card-title text-primary">{empdetails.name}</h4>
                    <p className="card-text">
                      <strong className="text-muted">Email:</strong> {empdetails.email}
                    </p>
                    <p className="card-text">
                      <strong className="text-muted">Phone:</strong> {empdetails.phone}
                    </p>
                    <p className="card-text">
                      <strong className="text-muted">Department:</strong> {empdetails.department}
                    </p>
                    <p className="card-text">
                      <strong className="text-muted">Salary:</strong> {empdetails.salary}
                    </p>
                    <div className="d-flex justify-content-start">
                      {/* Buttons Section */}
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => window.history.back()}
                      >
                        Back to List
                      </button>
                      <button className="btn btn-outline-warning" onClick={() => setIsEditing(true)}>
                        Edit Employee
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employeedetails;
