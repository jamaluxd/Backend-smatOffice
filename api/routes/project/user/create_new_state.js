const express = require("express");
const router = express.Router();
// const { validate, ValidationError, Joi } = require("express-validation");
//Validations
// const departmentValidations = require("../../../validations/department_validation");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Project = require("../../../models/project_schema.js");

router.post(
  "/",
  //   validate(departmentValidations.createOrUpdateDepartmentValidator),
  checkLogin,
  async (req, res) => {
    try {
      const updateList = await Project.findByIdAndUpdate(req.body.project_id, {
        $push: {
          states: [
            {
              title: req.body.title,
              create_date: new Date(),
              active_status: true,
              tasks: [],
            },
          ],
        },
      });

      res.status(200).json({
        status: 200,
        message: "State added successfully",
        body: updateList,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
        body: null,
      });
    }
  }
);

// router.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(500).json(err);
// });

module.exports = router;
