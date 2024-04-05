const User = require("../model/register");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { request } = require('express');

const Login = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    // const {email,password}=req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "User Not Found ",
      });
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
const getUser =async (req,res)=>{
  try{
    const userId= req.userId;
    console.log(userId);
    const exist = await User.findById(userId)
    console.log(exist);
    if(!exist)
   {
     console.log("user data not found");
     return res.status(400).jaon({
      status:400,
      error:'user data not found'
     })
    }
  
    return res.status(200).json({
      status: 200,
      message: "profile update Successfuly",

      data: exist,
    });

  }catch(error){
console.log("error",error);
return res.status(500).json({
  status: 500,
  error: "Server error",
});

  }

}






const profile = async (req, res) => {
  try {
    let image = "";

    if (req.file) {
      image = req.file.originalname;
    }
    // let updateId = req.userId;
    const userId = req.userId;
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;

    console.log(userId);
    const exist = await User.findByIdAndUpdate(
      userId,
      { name: name, email: email, mobile: mobile, image: image },
      { new: true }
    );
   if(!exist)
   {
    return res.status(400).json({
      status:400,
      error: 'user data are not Update '
    })

   }

    console.log(exist);
    return res.status(200).json({
      status: 200,
      message: "profile update Successfuly",

      data: exist,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Server error",
    });
  }
};
// updateDocument(updateId);

module.exports = { Login, changePassword, profile ,getUser};
