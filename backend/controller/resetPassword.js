const User = require("../model/register");
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const reset=async(req,res)=>{
    
        email=req.body.email,
        password=req.body.password
try{
        const hashPassword = await bcrypt.hash(password,10)
    const exist =await User.findOneAndUpdate({email:email},{password:hashPassword})
    console.log(exist);
    if(!exist){
        return res.status(400).json({
            status:400,
           success: false,
           message: "email is not register ",
         });
        }
  

    return res.status(200).json({
        status:200,
        success:true,
        message:"Password reset successfully"
    })
} catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ 
        success:false,
        message: 'Internal server error' });
}
}
module.exports={reset};