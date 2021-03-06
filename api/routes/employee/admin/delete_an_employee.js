const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Employee = require("../../../models/employee_schema");

router.post(
  "/",
  checkLogin,
  checkAdmin,
  async (req, res) => {
    try {
      const newEmployee = await Employee.findByIdAndUpdate(
        req.body.id,
        {
            active_status: false 
        }
      );
      res.status(200).json({
        status: 200,
        message: "Employee Deleted successfully",
        newEmployee: newEmployee,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  }
);



module.exports = router;
