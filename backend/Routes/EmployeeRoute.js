const { createEmployee, GetAllEmployee, getEmployeeById, deleteEmployeeById, updateEmployeeById } = require("../controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../Middleware/FileUploader");

const routes = require("express").Router();

routes.get("/",GetAllEmployee);
routes.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);
routes.put("/:id", cloudinaryFileUploader.single("profileImage"), updateEmployeeById);
routes.get('/:id',getEmployeeById)
routes.delete('/:id',deleteEmployeeById)
module.exports = routes;
