// import React from 'react'

// function Report() {
//   return (
//     <div>Report</div>
//   )
// }

// export default Report


// import React, { useState, useEffect, useMemo } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import {
//   TextField,
//   Button,
//   Avatar,
//   Grid,
//   Typography,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Profile = () => {
//   const [selectedImage, setSelectedImage] = useState("");

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const validationSchema = Yup.object().shape({
//     // name: Yup.string().required("Username is required"),
//     // email: Yup.string().email("Invalid email").required("Email is required"),
//   });

//   const [initialValues, setInitialValues] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     // image: "",
//   });
//   // const handleChange = (event) => {
//   //   const { name, value } = event.target;
//   //   setInitialValues((prev) => ({ ...prev, [name]: value }));
//   // };
//   console.log("initialValues", initialValues);

//   useEffect(() => {
    
//     axios
//       .get("http://localhost:8005/getUser", {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log("gfghfgh",res.data.data.name);
       
//         setInitialValues({
        
//           name: res.data.data.name,
//           email: res.data.data.email,
//           mobile: res.data.data.mobile,
//           image: res.data.data.image,
//         });
        
//       })
//       .catch((error) => {
//         console.log("Error fetching user data:", error);
//       });
//   }, [token]); // Now include 'initialValues' as a dependency in useEffect



  
//   const handleSubmit = async (values) => {
//     try {
//       console.log(selectedImage);
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("mobile", values.mobile);
//       if (selectedImage) {
//         formData.append("image", selectedImage);
//       }

//       // Send the FormData object to the server using Axios or any other HTTP library
//       const response = await axios.put(
//         "http://localhost:8005/profile",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: token,
//           },
//         }
//       );
//       // console.log(response.status);
//       if (response.status === 200) {
//         toast.success("Success Update !");
//         // setTimeout(() => {
//           navigate("/home");
//         // }, 5500);
//       } else if (response.status === 400) {
//         toast.error("User data not Update . Please try again.");
//       }

//       console.log(response.data); // Handle successful response
//     } catch (error) {
//       console.error("Error:", error); // Handle error
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   const handleImageChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={validationSchema}
//     >
//       {({ isSubmitting,values}) => (
//         <Grid
//           container
//           justifyContent="center"
//           alignItems="center"
//           height="100vh"
//         >
//           <Grid item xs={6}>
//             <Box textAlign="center">
//               <Avatar
//                 sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
//                 src={
//                   selectedImage
//                     ? URL.createObjectURL(selectedImage)
//                     : `http://localhost:8005/upload/images/${initialValues.image}`
//                 }
//                 alt="Profile"
//               />

//               <Typography variant="h5" gutterBottom>
//                 Edit Profile
//               </Typography>
//             </Box>
//             {/* <Formik
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           validationSchema={validationSchema}
//         >
//           {({ isSubmitting,values }) => ( */}
//             <Form>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={12}>
//                   <input
//                     accept="image/*"
//                     // value={values.image}
//                     id="image-upload"
//                     src={selectedImage}
//                     type="file"
//                     style={{ display: "none" }}
//                     onChange={handleImageChange}
//                   />
//                   <label htmlFor="image-upload">
//                     <Button variant="contained" component="span">
//                       Upload Image
//                     </Button>
//                   </label>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="name"
//                     value={initialValues.name}
//                     as={TextField}
//                     label="name"
//                     variant="outlined"
//                     fullWidth
//                     // onChange={(e)=>{handleChange(e)}}
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     style={{ color: "red" }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="email"
//                     type="email"
//                      value={initialValues.email}
                   
//                     as={TextField}
//                     label="Email"
//                     variant="outlined"
//                     fullWidth
//                     // onChange={(e)=>{handleChange(e)}}
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     style={{ color: "red" }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="mobile"
//                     value={initialValues.mobile}
//                     as={TextField}
//                     label="Mobile"
//                     variant="outlined"
//                     fullWidth
//                     // onChange={(e)=>{handleChange(e)}}
//                   />
//                   <ErrorMessage
//                     name="mobile"
//                     component="div"
//                     style={{ color: "red" }}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitting}
//                 fullWidth
//                 sx={{ mt: 2 }}
//                 // onChange={(e)=>{handleChange(e)}}
//               >
//                 Save Changes
//               </Button>
//             </Form>
//           </Grid>
//         </Grid>
//       )}
//     </Formik>
//   );
// };

// export default Profile;

