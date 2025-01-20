const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file.path : null;
    console.log(body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "employee created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "employee already exist",
      success: false,
      error: error,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { name, phone, email, salary, department } = req.body;
    const { id } = req.params;
    let updateData = {
      name,
      phone,
      email,
      salary,
      department,
      updatedAt: new Date(),
    };
    if (req.file) {
      updateData.profileImage = req.file.path;
    }
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).json({
        message: "employee not found",
      });
    }
    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const GetAllEmployee = async (req, res) => {
  try {

    // search functuionalitty 
    let {page,limit,search}=req.query
    page=parseInt(page)||1
    limit=parseInt(limit)||5
    const skip=(page-1)*limit
    let searchCreteria={}
  if(search){
    searchCreteria={
      name:{
        $regex:search,
        $options:'i'
      }
    }
  }
  const totalEmployees=await EmployeeModel.countDocuments(searchCreteria)

    const emps = await EmployeeModel.find(searchCreteria)
    .skip(skip)
    .limit(limit)
    .sort({updatedAt:-1})


    const totalPages=Math.ceil(totalEmployees/limit)

    res.status(200).json({
      message: " All employee ",
      success: true,
      data:
      {
        employees:emps,
        pagination:{
          totalEmployees,
          currentPage:page,
          totalPages,
          pagesize:limit

        }

      } 
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const emp = await EmployeeModel.findOne({ _id: id });

    res.status(200).json({
      message: "employee details",
      success: true,
      data: emp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "employee deleted",
      success: true,
      // data:emp
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createEmployee,
  GetAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
