const mongoose=require('mongoose');
const bcrypt =require('bcrypt')
const userSchema=new mongoose.Schema({

name:{
        type:String,
},

email:{
    type:String,
    
},
password:{
    type:String
},

mobile:{
     type:String,
},
otp:{
    type:String,
    default : ""
},
confirmPassword:{
    type:String,
},
image:{
    type:String,
   // required:true
},
role:{
    type:String
},
status: {
    type: String,
   
  },
job:{
    type:String,
    
},
age:{
    type:String,
    
},
employeeId:{
    type:String,
    
},


})

userSchema.pre('save',function(next){
    var user=this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err)
            {
                return next(err)
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err)
                {
                    return next(hash)
                }
                user.password=hash;
                next();
            })

        })  
    }
    else{
        return next();
    }
})



module.exports = mongoose.model("User",userSchema);