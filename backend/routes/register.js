const express = require("express");
const router = express.Router();
const User = require("../model/register");
const bcrypt =require('bcrypt')
const registerController = require("../controller/registerController");
const loginController =require("../controller/loginController")
const otpSend =require("../controller/otpSend")
const resetiop =require("../controller/resetPassword")
const { body, validationResult } = require("express-validator");
router.post(
  "/Register",
  [
    body("name").not().trim().isEmpty().withMessage("name is require"),
    body("email").not().trim().isEmpty().withMessage("email is require"),
    body("password").not().trim().isEmpty().withMessage("password is require"),
    body("mobile").not().isEmpty().withMessage("mobile number is require"),
  ],
  (req, res) => {
    const error = validationResult(req);
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
router.post("/Login",loginController.Login)
router.post("/otpSend",otpSend.sendOtp)
router.post("/verifyOtp",otpSend.verifyOtp)
router.put("/reset",resetiop.reset)
module.exports = router;
