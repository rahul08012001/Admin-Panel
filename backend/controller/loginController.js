const Employee = require("../model/employee");
const User = require("../model/register");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const Login = async (req, res) => {
//   try {
//     const email = req.body?.email;
//     const password = req.body?.password;

//     const user = await User.findOne({ email: email });
    
//     if (!user) {
//       const employee = await Employee.findOne({ email: email });
//       if (!employee) {
//         return res.status(401).json({
//           status: 401,
//           error: "User Not Found",
//         });
//       }
     
//       const passwordMatch = await bcrypt.compare(password, employee.password);
//       if (!passwordMatch) {
//         return res.status(402).json({
//           status: 402,
//           error: "Password is incorrect",
//         });
//       }
//       const token = jwt.sign({ userId: employee._id }, "your-secret-key", {
//         expiresIn: "1h",
//       });

//       return res.status(200).json({
//         status: 200,
//         message: "User login",
//         data: employee,
//         token: token,
//       });
//     }

//     // If user found in User schema, compare password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(402).json({
//         status: 402,
//         error: "Password is incorrect",
//       });
//     }
//     const token = jwt.sign({ userId: user._id }, "your-secret-key", {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({
//       status: 200,
//       message: "User login",
//       data: user,
//       token: token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       error: "Login failed: " + error.message,
//       data: null,
//     });
//   }
// };

const Login = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    const role= req.body?.role;
    


    console.log("email",role);

    const user = await User.findOne({ email:email,role:role});
    console.log("user",user);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "User Not Found ",
      });
    }
    if (user.status === 'inactive') {
      return res.status(403).json({ status: 403, error: "User status is inactive" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(402).json({
        status: 402,
        error: "password is not match",
      });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: 200,
      message: "user login",
      data: user,
      role:role,
      token: token,

    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "login failed " + error.message,
      data: null,
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const Old_password = req.body?.Old_password;
    const New_password = req.body?.New_password;

    console.log("Old_password", Old_password);
    console.log("New_password", New_password);

    // const Hashpassword=req.user?.password;
    const userId = req.userId;
    console.log("userId", req.userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "user not  found",
      });
    }
    
    const comparePassword = await bcrypt.compare(Old_password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        status: 404,
        error: "Current password is incorrect",
      });
    }

    const hashpassword = await bcrypt.hash(New_password, 10);

    const exist = await User.findByIdAndUpdate(
      { _id: userId },
      {
        password: hashpassword,
      }
    );
    console.log("exist", exist);

    if (!exist) {
      return res.status(402).json({
        status: 402,
        error: "old password is Incorrect",
        data: null,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "old password is correct",
      data: user,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if user exists in the User schema
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({
        status: 200,
        message: "User found",
        data: user,
      });
    }

    // If user not found in User schema, check Employee schema
    const employee = await Employee.findById(userId);
    if (employee) {
      return res.status(200).json({
        status: 200,
        message: "Employee found",
        data: employee,
      });
    }

    // If user not found in either schema, return error
    return res.status(404).json({
      status: 404,
      error: "User or employee not found",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: 500,
      error: "Server error",
    });
  }
};



const profile = async (req, res) => {
  try {
    let image = "";

    if (req.file) {
      image = req.file.originalname;
    }
    const userId = req.userId;
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;

    // Check if the user exists in the User schema
    const user = await User.findByIdAndUpdate(
      userId,
      { name: name, email: email, mobile: mobile, image: image },
      { new: true }
    );

    // If user not found in User schema, update profile in Employee schema
    if (!user) {
      const employee = await Employee.findByIdAndUpdate(
        userId,
        { name: name, email: email, mobile: mobile, image: image },
        { new: true }
      );

      if (!employee) {
        return res.status(404).json({
          status: 404,
          error: "User not found",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Profile updated successfully",
        data: employee, // Return either user or employee data
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: user, // Return either user or employee data
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal server error",
    });
  }
};



module.exports = {
  Login,
  changePassword,
  profile,
  getUser,
 
  
};
