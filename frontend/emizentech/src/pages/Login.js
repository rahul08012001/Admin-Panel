

import React, { useState } from 'react';
import { Box, Paper, Button, TextField, Typography, Avatar, FormControl, Select, MenuItem, Container } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required").min(6, "Password must be at least 6 characters"),
  
});

const initialValuesRegister = {
  email: "",
  password: "",
  role: "", // Default role value
};

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState('Select');
console.log("role",role);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      values.role = role;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/Login`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
console.log("response.data.data.role",response.data.data.role);
      
      if (response.data.status === 200) {
        fetchData();
        const userRole = response.data.data.role;
       navigate("/Dashboard");
console.log("response.data.data",response.data);
        dispatch(loginSuccess({ user: response.data.data }));
        tokenSave(response.data.token);
        toast.success("Success Login !");
      } else if (response.data.status === 402) {
        dispatch(loginFailure({ error: "Invalid credentials" }));
        console.log("Invalid credentials");
      }
    } catch (error) {
      dispatch(loginFailure({ error: "An error occurred" }));
      console.log("error", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const tokenSave = (token) => {
    localStorage.setItem("token", token);
  };
 
  const fetchData = async () => {
    try {
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${end}/getUser`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      
      // const user = response.data.data;
      // dispatch(loginSuccess({ user: user }));
    
    } catch (error) {
      console.log("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const paperStyle = { padding: "50px 30px", width: 350, margin: "20px auto" };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        isSubmitting,
      }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
          margin="auto"
          p={4}
        >
          <Paper elevation={20} style={paperStyle}>
            <Container style={{ justifyContent: "center", marginLeft: "50" }}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 50, height: 50, mx: "auto", mb: 2 }}
                src="/static/images/avatar/2.jpg"
              />
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>
            </Container>
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="20px">
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                />
                <FormControl fullWidth>
                  <Select
                    value={role}
                    onChange={handleRoleChange}
                    name="role"
                  >
                    {console.log(role)}
                    <MenuItem value="Select">Select</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Subadmin">Subadmin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "16px" }}
                // onClick= { handleClearStore}
                >
                  Login
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/Otpsend");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </Formik>
  );
};

export default FormRegister;
