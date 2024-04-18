import React, { useState, useEffect } from "react";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../components/Dashboard";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().required("required"),
  mobile: yup.string().required("required"),

 
});

const FormRegister = () => {
  const navigate = useNavigate();
  
  let { id } = useParams();
  console.log("id", id);
  const paperStyle = { padding: "30px 20px", width: 450, margin: "20px auto" };
  const [initialValuesRegister, setInitialValuesRegister] = useState({
    name: "",
    email: "",
    mobile: "",
    
  });

  const fetchData = async () => {
    try {
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${end}/getSubAdmin/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = response.data.data;

      setInitialValuesRegister({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
      
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
      // Handle error appropriately, e.g., show an error message to the user
      toast.error("Failed to fetch user data. Please try again ");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${end}/updateEmployee/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      console.log("response", response);
      if (response.status === 200) {
        // setSubmitting(false);
        toast.success("Update User Successfuly !");

        console.log(response.data);
        setTimeout(async () => {
          navigate("/Superadmin");
        }, 5500);
      }
    } catch (error) {
      console.log("error", error);

      if (error.response.data.status === 400) {
        toast.error("employeeId is already exist");
      }
    } finally {
      setSubmitting(false);
    }

    
  };

  return (
    <>
      <Dashboard />
      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
          enableReinitialize
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
              height="100vh" // Make the container full height
              margin="auto" // Center the container horizontally
              p={4} // Add margin from all sides
            >
              <Paper elevation={20} style={paperStyle}>
                <Typography variant="h5" gutterBottom>
                  Update Employee Data
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="20px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 6" }}
                    />
                    <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 6" }}
                    />
                    <TextField
                      label="Mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      name="mobile"
                      error={Boolean(touched.mobile) && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                      sx={{ gridColumn: "span 6" }}
                    />
                   
                   
                  </Box>
                  <Box mt={1}>
                    {" "}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      style={{ marginTop: "16px" }}
                    >
                      Update Employee
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Box>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormRegister;
