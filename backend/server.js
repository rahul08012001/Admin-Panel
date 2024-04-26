// const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors")
const app = express();
const bodyparser =require("body-parser");
require("dotenv").config();
const userRouter = require("./routes/register")
const employeeRouter = require("./routes/employee")
const roleRouter = require("./routes/role")

const jwt =require("jsonwebtoken")

// dotenv.config();
// const port = 8040;
const port = process.env.PORT;
console.log("port", port)
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(userRouter,roleRouter,employeeRouter)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/test_db') //
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`server is listen at  ${port} `);
});
