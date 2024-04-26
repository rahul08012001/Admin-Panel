const express = require("express");
const router = express.Router();
const Role = require("../model/employee");

const roleController = require("../controller/role");


router.post("/createRole", roleController.createRole);
router.post("/updateRole/:id", roleController.updateRole);
router.get("/AllRole", roleController.AllRole);
router.get("/getRoleById/:id", roleController.getRoleById);
router.delete("/deleteRole/:_id", roleController.deleteRole);
module.exports = router;
