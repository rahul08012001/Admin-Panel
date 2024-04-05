const User = require("../model/register");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const otpGenerator = require("otp-generator");
const sendOtp = async (req, res) => {
  // try{

  const email = req.body.email;
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);

  const data = await User.findOneAndUpdate({ email: email }, { otp: otp });
  console.log("data0", data);
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "email is not register ",
    });
  }

  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "tjerry548@gmail.com",
      pass: "mgeswrvfvgofsnnl",
    },
  });

  let info = {
    from: "tjerry548@gmail.com",
    to: email,
    subjest: "password reset OTP",
    text: `your otp (It is expire after one min): ${otp} `,
  };
  // console.log("info",info)
  transport.sendMail(info, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "send otp success",
      });
    }
  });
};
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const exist = await User.findOne({ otp: otp });
    console.log("user otp", req.body.otp);
    console.log("user otp", otp);
    if (exist) {
      return res.status(200).json({
        success: true,
        message: "OTP verification successful",
      });
    } else {
      return res.status(402).json({
        success: false,
        error: "Invalid OTP",
      });
    }
  } catch (error) {
    returnres.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
module.exports = { sendOtp, verifyOtp };
