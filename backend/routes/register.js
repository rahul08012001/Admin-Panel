const express = require("express");
const router = express.Router();
const User = require("../model/register");
const bcrypt =require('bcrypt')
const registerController = require("../controller/registerController");
const loginController =require("../controller/loginController")
const otpSend =require("../controller/otpSend")
const resetiop =require("../controller/resetPassword")
const verifyToken =require("../middleware/verifyToken")
const imageUploade =require("../middleware/imageUploade")
// const getUser =require("../controller/loginController")

const { body, validationResult } = require("express-validator");
const phoneNumberRules = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
router.post(
  "/Register",
  [
    body("name").not().trim().isEmpty().withMessage("name is require"),
    body("email").not().trim().isEmpty().withMessage("email is require").isEmail().withMessage("not a proper email"),
    body("password").not().trim().isEmpty().withMessage("password is require").isLength({ min: 8 }).withMessage("password must be 6"),
    body("mobile").not().isEmpty().withMessage("mobile is require").isMobilePhone().withMessage("Enter valid mobile number ").isLength({ min: 10,max:10 }).withMessage("Enter valid mobile number")
    
  ],
  (req, res) => {
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: error.array()[0].msg,
        data:{}
      });
    }
    registerController.registerUser(req,res)
  }
);
router.post("/Login",
[
  body("email").not().trim().isEmpty().withMessage("email is require").isEmail().withMessage("not a proper email"),
    body("password").not().trim().isEmpty().withMessage("password is require").isLength({ min: 8 }).withMessage("password must be 6"),
],(req,res) =>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      status:400,
      message:error.array()[0].msg,
      data:{}
    })
  }
loginController.Login(req,res)
});
router.post("/otpSend",
[
  body("email").not().trim().isEmpty().withMessage("email is require").isEmail().withMessage("not a proper email")
],(req,res) =>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      status:400,
      message:error.array()[0].msg,
      data:{}
    })
  }otpSend.sendOtp(req,res)
});
router.post("/verifyOtp",
[
  body("otp").not().trim().isEmpty().withMessage("otp is require").isLength({ min: 6,max:6 }).withMessage("Enter opt 6 digits")
],(req,res) =>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      status:400,
      message:error.array()[0].msg,
      data:{}
    })
  }otpSend.verifyOtp(req,res)
});
router.put("/reset",[
  body("email").not().trim().isEmpty().withMessage("email is require").isEmail().withMessage("not a proper email"),
    body("password").not().trim().isEmpty().withMessage("password is require").isLength({ min: 8 }).withMessage("password must be 6"),
],(req,res) =>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      status:400,
      message:error.array()[0].msg,
      data:{}
    })
  }
resetiop.reset(req,res)
})
router.post("/changePassword",verifyToken,loginController.changePassword)
router.put("/profile",verifyToken,imageUploade.single("image"),loginController.profile)
router.get("/getUser",verifyToken,loginController.getUser)
module.exports = router;
