const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
router.post("/addEmployee", employeeController.addEmplyee);
router.get("/allEmployee", employeeController.AllEmployee);
router.delete("/deleteEmployee/:_id", employeeController.deleteEmployee);
router.get("/getSubAdmin/:id",employeeController.getSubAdmin)
router.put("/updateEmployee/:id", employeeController.updateEmployee);
router.post("/subAdmin",employeeController.subAdmin)
router.post("/updateStatus/:_id",employeeController.updateStatus)
module.exports = router;
