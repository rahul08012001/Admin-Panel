const User =require('../model/register')
const mongoose =require('mongoose')
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
// const { request } = require('express');

const Login =async(req,res)=>{
    try{
        const email=req.body?.email;
        const password=req.body?.password;
        // const {email,password}=req.body;

        const user = await User.findOne({ email : email});
        console.log(user);
        if(!user){
            return res.status(401).json({
                status:401,
                error: 'User Not Found ',
            })
        }
        const passwordMatch =await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(402).json({
                status:402,
                error:'password is not match'
            })
        }
        const token =jwt.sign({userId:user._id},'your-secret-key',{
            expiresIn:'1h',
        });
      
        return res.status(200).json({
            status:200,
            message:'user login',
            data:user,
            token:token,
            
        })
        
    } 
    catch(error){
        return res.status(500).json({
            status:500,
            error:'login failed '+error.message,
            data:null
        });
    }
}


module.exports={Login}