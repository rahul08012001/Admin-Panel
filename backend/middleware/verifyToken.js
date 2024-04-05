const jwt =require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token =req.header('Authorization');
    console.log("TOKEN--->",token);
    if(!token) {
        return res.status(401).json({error : 'Access denied'})
    };
        try{
            const decoded = jwt.verify(token,'your-secret-key');
            console.log("decoded",decoded)
            req.userId = decoded.userId;
            // console.log("req.userId",req.userId)
            next();

        }
        catch(error){
        return res.status(401).json({error:'Invalid token'});
        }
    };
module.exports = verifyToken;
