const Role = require("../model/employee");
const mongoose = require("mongoose");

const createRole = async (req, res) => {
  const name = req.body?.name;
  

  try {
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({
        status: 400,
        message: "Role already exists",
      });
    }

    const newRole = new Role({ name });
    await newRole.save();
    res.status(200).json({
      status: 200,
      message: "Role are Add Successfuly",
      newRole,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  const name = req.body?.name;

  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        status: 400,
        message: "Role not found",
      });
    }

    role.name = name;
    await role.save();
    return res.status(200).json({
      status: 200,
      message: "Role are Update Successfuly",
      role: role
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
    try {
      const deleteid = req.params._id;
      const exist = await Role.findByIdAndDelete({ _id: deleteid });
      console.log(exist);

      if (!exist) {
        return res.status(400).json({
          status: 400,
          error: "id not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "delete Role  Successfuly",
      });
    } catch {
      return res.status(500).json({
        status: 500,
        error: "server error",
      });
    }
  };

  const AllRole = async (req, res) => {
    try {
      const exist = await Role.find();
      console.log(exist);
      if (exist.length == 0) {
        console.log("subAdmin not found");
        return res.status(400).json({
          status: 400,
          error: "subAdmin not found",
          data: null,
        });
      }
  
      return res.status(200).json({
        status: 200,
        message: "All Role Successfuly",
  
        data: exist,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        status: 500,
        error: "Server error",
      });
    }
  };
  const getRoleById = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const exist = await Role.findById(userId);
      console.log(exist);
      if (!exist) {
        console.log("Role not found");
        return res.status(400).jaon({
          status: 400,
          error: "Role not found",
        });
      }
  
      return res.status(200).json({
        status: 200,
        message: "Role get  Successfuly",
  
        data: exist,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        status: 500,
        error: "Server error",
      });
    }
  };

module.exports = { createRole, updateRole,deleteRole,AllRole,getRoleById };
