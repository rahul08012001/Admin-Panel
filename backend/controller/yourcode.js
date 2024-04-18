// // const { request } = require('express');

const Login = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    // const {email,password}=req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "User Not Found ",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(402).json({
        status: 402,
        error: "password is not match",
      });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: 200,
      message: "user login",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "login failed " + error.message,
      data: null,
    });
  }
};


// const getUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log(userId);
//     const exist = await User.findById(userId);
//     console.log(exist);
//     if (!exist) {
//       console.log("user data not found");
//       return res.status(400).jaon({
//         status: 400,
//         error: "user data not found",
//       });
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "profile update Successfuly",

//       data: exist,
//     });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({
//       status: 500,
//       error: "Server error",
//     });
//   }
// };// const getUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log(userId);
//     const exist = await User.findById(userId);
//     console.log(exist);
//     if (!exist) {
//       console.log("user data not found");
//       return res.status(400).jaon({
//         status: 400,
//         error: "user data not found",
//       });
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "profile update Successfuly",

//       data: exist,
//     });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({
//       status: 500,
//       error: "Server error",
//     });
//   }
// };


// const profile = async (req, res) => {
//   try {
//     let image = "";

//     if (req.file) {
//       image = req.file.originalname;
//     }
//     // let updateId = req.userId;
//     const userId = req.userId;
//     let name = req.body.name;
//     let email = req.body.email;
//     let mobile = req.body.mobile;

//     console.log(userId);
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { name: name, email: email, mobile: mobile, image: image },
//       { new: true }
//     );
   
//     if (!exist) {
//       const employee = await Employee.findByIdAndUpdate(
//         userId,
//         { name: name, email: email, mobile: mobile, image: image },
//         { new: true }
//       );
//     }

//     console.log(exist);
//     return res.status(200).json({
//       status: 200,
//       message: "profile update Successfuly",

//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       error: "Server error",
//     });
//   }
// };
// updateDocument(updateId);