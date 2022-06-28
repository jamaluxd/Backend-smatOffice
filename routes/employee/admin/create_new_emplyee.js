const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Employee = require("../../../models/employee_schema");

router.post("/", checkLogin, checkAdmin, async (req, res) => {
  console.log(req.body);
  try {
    const cleckExistingEmployee = await Employee.findOne({
      email: req.body.email,
    });
    if (cleckExistingEmployee == null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const employee = new Employee({
        name: req.body.name,
        department_id: req.body.department_id,
        designation_id: req.body.designation_id,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.admin,
        active_status: true,
      });
      const newEmployee = await employee.save();
      res.status(200).json({
        status: 200,
        message: "Employee added successfully",
        newEmployee: newEmployee,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "Email already exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
