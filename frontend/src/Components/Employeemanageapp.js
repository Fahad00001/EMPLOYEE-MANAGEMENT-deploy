import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { GetAllEmployee } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employeemanageapp() {
    const [showmodal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [employeedata, setEmployeeData] = useState({
        employees: [],
        pagination: {
            totalEmployees: 10,
            currentPage: 1,
            totalPages: 1,
            pagesize: 5,
        },
    });

    const fetchEmployees = async (search = "", page = 1, limit = 5) => {
        try {
            const { data } = await GetAllEmployee(search, page, limit);
            setEmployeeData(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees(searchQuery); // Include searchQuery when fetching employees
    }, [searchQuery]); // Re-fetch when searchQuery changes

    const handleAddEmployee = () => {
        setShowModal(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query state
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
            <h1>Employee Management App</h1>
            <div className="w-100 d-flex justify-content-center">
                <div className="w-100 border bg-light p-3" style={{ width: "80%" }}>
                    <div className="d-flex justify-content-between mb-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleAddEmployee}
                        >
                            Add
                        </button>
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="form-control w-50"
                            value={searchQuery} // Bind to searchQuery state
                            onChange={handleSearchChange} // Handle input changes
                        />
                    </div>
                    <EmployeeTable
                        employees={employeedata.employees}
                        pagination={employeedata.pagination}
                        fetchEmployees={fetchEmployees}
                    />
                    <AddEmployee
                    fetchEmployees={fetchEmployees}
                        showmodal={showmodal}
                        setShowModal={setShowModal}
                    />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
}

export default Employeemanageapp;
