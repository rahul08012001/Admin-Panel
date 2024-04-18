const Employee = require("../model/employee");
const User = require("../model/register");
const mongoose = require("mongoose");

const addEmplyee = async (req, res) => {
  try {
    const email = req.body.email;
    const duEmployee = await User.findOne({ email });
    if (duEmployee) {
      return res.status(409).json({
        status: 409,
        message: "email is already exist",
        data: null,
      });
    }
    const employee = await User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      mobile: req.body.mobile,
      password: req.body.password,
    }).save();

    console.log(employee);

    return res.status(200).json({
      status: 200,
      message: "SubAdmin Add Successfuly",
      data: employee,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      error: "Server error",
    });
  }
};
const AllEmployee = async (req, res) => {
  try {
    const exist = await User.find();
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
      message: "get all subAdmin Successfuly",

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
const deleteEmployee = async (req, res) => {
  try {
    const deleteid = req.params._id;
    const exist = await User.findByIdAndDelete({ _id: deleteid });
    console.log(deleteid);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        error: "id not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "delete Employee  Successfuly",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
};
const getSubAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const exist = await User.findById(userId);
    console.log(exist);
    if (!exist) {
      console.log("subAdmin data not found");
      return res.status(400).jaon({
        status: 400,
        error: "subAdmin data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "get subAdmin  Successfuly",

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
const updateEmployee = async (req, res) => {
  try {
    const email = req.body.email;
    const duEmployee = await User.findOne({ email });
    if (duEmployee) {
      return res.status(409).json({
        status: 409,
        message: "email id already exist",
      });
    }
    let updateid = req.params.id;

    console.log("updateid", updateid);
    let updatename = req.body.name;
    let updateemail = req.body.email;
    let updatemobile = req.body.mobile;

    const resp = await User.findOneAndUpdate(
      { _id: updateid },
      {
        $set: {
          name: updatename,
          email: updateemail,
          mobile: updatemobile,
        },
      }
    );
    if (!resp) {
      return res.status(400).json({
        status: 400,
        message: "employee not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "user update successfuly",
      data: resp,
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};

const subAdmin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //   const hashedPassword = await bcrypt.hash(password, 10);
    const subadmin = new Employee({
      email: email,
      password: password,
      role: "subadmin", // Sub-admins are also admins
    });
    // await subadmin.save();
    return res.status(200).json({
      status: 200,
      message: "subAdmin create successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};

const updateStatus = async (req, res) => {
  const newStatus = req.body.status;

  try {
    const deleteid = req.params._id;
    let statusDoc = await User.findOne({_id: deleteid });
    console.log("statusDoc",statusDoc);
    // if (!statusDoc) {
    //   statusDoc = new User();
    // }
    statusDoc.status = newStatus;
    await statusDoc.save();

    return res.status(200).json({
      status: 200, 
      message: "Status updated successfully", 
      newStatus: statusDoc.status
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  addEmplyee,
  AllEmployee,
  deleteEmployee,
  updateEmployee,
  subAdmin,
  getSubAdmin,
  updateStatus,
};
