const mongoose=require('mongoose');
const bcrypt =require('bcrypt')
const userSchema=new mongoose.Schema({
id:{
    type:String,
},
name:{
        type:String,
},
email:{
    type:String,
    
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
password:{
    type:String,
    
},
otp:{
    type:String
},

mobile:{
    type:String,
},

image:{
    type:String
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

module.exports = mongoose.model("Employee",userSchema);
