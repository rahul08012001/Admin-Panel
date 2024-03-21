const User = require("../model/register");
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
// const { ExpressValidator } = require("express-validator");
const {validationResult} = require('express-validator')
const registerUser= async (req,res)=>{
    const user =new User({
    name:req.body?.name,
    email:req.body?.email,
    password:req.body?.password,
    mobile:req.body?.mobile,
})
const email =req.body.email;
console.log("user",user);
const exist =await User.findOne({ email})

if(exist){
    return res.status(409).json({
        status:409,
        message:'email is already exist',
        data:user
    })
}
console.log(user)
   const data_user = await user.save();
   return res.status(200).json({
    status:200,
    message:'Register Successfuly',
    datai : data_user
})
}

module.exports= {
    registerUser
}