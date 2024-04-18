import React, { useState, useEffect ,useCallback} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Paper,
  Button,
  Avatar,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch} from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authSlice";
import Dashboard from "./Dashboard";
const Profile = () => {
  const dispatch = useDispatch();
  
  const paperStyle = {
    padding: "7px 5px",
    width: 600,
    margin: "32px auto",
  };
  const [selectedImage, setSelectedImage] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "", // Add image here if it's part of the initial values
  });
  const registerSchema = Yup.object().shape({
    name: Yup.string().required("name required"),
    email: Yup.string().email("invalid email").required("email required"),

    mobile: Yup.string()
      .required("mobile no. required")
      .min(10, "Too Short!")
      .max(10, "Too Long !")
      .max(10, "Too Long!"),
  });
  // console.log("initialValues", initialValues);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
 const fetchData =  useCallback(async () => {
    try {
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${end}/getUser`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      
      const user = response.data.data;
      console.log(user , "response data");
      dispatch(loginSuccess({ user: user }));
      setInitialValues({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        image: user.image,
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
      dispatch(loginFailure({ error: "data are not get" }));
      // Handle error appropriately, e.g., show an error message to the user
      toast.error("Failed to fetch user data. Please try again.");
    }
  },[dispatch, token, setInitialValues]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log("values", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${end}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log("response",response.data.data);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        fetchData()
        // dispatch(loginSuccess({ user: response.data.data }));
        setTimeout(() => {
          navigate("/Dashboard");
        }, 5500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(true);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <>
    <Dashboard />
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
      enableReinitialize
    >
      {({ isSubmitting, values }) => (
        <Paper elevation={10} style={paperStyle}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            {console.log("values",values)}
            <Grid item xs={6}>
              <Box textAlign="center">
                <Avatar
                  sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `http://localhost:8005/upload/images/${initialValues.image}`
                  }
                  alt="Profile"
                />
               
                <Typography variant="h5" gutterBottom>
                  Edit Profile
                </Typography>
              </Box>
              <Form>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      id="image-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                  </Grid>
                 
                  <Grid item xs={12}>
                    <Field
                      name="name"
                      as={TextField}
                      label="Name"
                      variant="outlined"
                      // value={values?.name}
                      fullWidth
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="mobile"
                      as={TextField}
                      label="Mobile"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "16px" }}
                >
                  Save Changes
                </Button>
              </Form>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Formik>
    </>
  );
};

export default Profile;
