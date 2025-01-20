import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EditEmployeeModal from "./EditEmployeeModal"; // Modal for editing employee
import { deleteEmployee } from "../api"; // API call to delete employee

function EmployeeTable({ employees, pagination, fetchEmployees }) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  const [selectedEmployee, setSelectedEmployee] = useState(null); // For edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true); // Show edit modal
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(employeeId); // API call to delete
        toast.success("Employee deleted successfully!");
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee.");
      }
    }
  };

  const Tablerow = ({ employee }) => {
    return (
      <tr>
        <td>
          <Link to={`/employee/${employee._id}`} className="text-decoration-none">
            {employee.name}
          </Link>
        </td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td>
          <i
            className="bi bi-pencil-fill text-warning me-3"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
            onClick={() => handleEdit(employee)}
          ></i>
          <i
            className="bi bi-trash-fill text-danger"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete"
            onClick={() => handleDelete(employee._id)}
          ></i>
        </td>
      </tr>
    );
  };

  const pageNumber = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <Tablerow key={emp._id} employee={emp} />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumber.map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={`btn btn-outline-primary me-1 ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Edit Employee Modal */}
      {showEditModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            setShowEditModal(false);
            fetchEmployees(); // Refresh list after saving
          }}
        />
      )}
    </>
  );
}

export default EmployeeTable;
