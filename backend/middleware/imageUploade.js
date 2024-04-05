const path =require("path")
const multer =require("multer")

const storage= multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'public/upload/images');
    },
    
    filename: function(req,file,cb){
        console.log(file);
        if(file){

            console.log("if------")
            let ext = path.extname(file.originalname);
            const uniqueSuffix =Date.now()+'-'+ Math.round(Math.random() * 1E9)
            file.originalname = uniqueSuffix+ext
            cb(null,file.originalname);

        }
        
       
    }

})
console.log("storage",storage)

const upload=multer({storage:storage})
module.exports=upload;

