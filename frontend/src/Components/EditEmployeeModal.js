import React, { useState } from "react";
import { updateEmployee } from "../api"; // API call to update employee
import { toast } from "react-toastify";

function EditEmployeeModal({ employee, onClose, onSave }) {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateEmployee(formData._id, formData); // API call
      toast.success("Employee updated successfully!");
      onSave();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              className="form-control mb-2"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              className="form-control mb-2"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
