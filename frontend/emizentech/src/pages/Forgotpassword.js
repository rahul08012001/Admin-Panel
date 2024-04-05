import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EmailOtpForm = () => {
  const navigate = useNavigate();
  const paperStyle = { padding: "70px 50px", width: 350, margin: "20px auto" };

  const initialValues = {
    email: "",
    otp: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    otp: Yup.string()
      .min(6, "OTP must be 6 characters")
      .max(6, "OTP must be 6 characters")
      .required("Required"),
  });
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const end = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${end}/verifyOtp`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        console.log("success", response.status);
        toast.success("Otp verify Success  !");
        setTimeout(() => {
          navigate(`/Forgot?email=${values.email}`);
        }, 5500);
      }
      // else if (response.data.status === 402) {
      //   console.log("please enter valide OTP");
      // }
    } catch (error) {
      console.log("error", error);
      if (error.response.status === 402) {
        toast.error("please enter valide OTP");
      }
    }
  };
  //   });

  const handleSendOTP = async (values) => {
    console.log(values);

    try {
      const url = "http://localhost:8005/otpSend";
      const response = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);

      if (response.status === 200) {
        toast.success("Otp send Success  !");
        console.log("success", response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("can not send otp because email is not register");
        toast.error("Otp send failed. Email is not exist");
      }

      console.log("error", error);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onClick={handleSendOTP}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        // resetForm,
        isSubmitting,
      }) => (
        <Paper elevation={20} style={paperStyle}>
          <Container maxWidth="xs" >
            <Box
              
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
               
              }}
            >
              <Typography variant="h5" gutterBottom>
                Email OTP Verification
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "120%" }}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                 
                />
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendOTP(values, { isSubmitting });
                  }}
                >
                  {isSubmitting ? "Logging in..." : "otp send"}
                </Button>

                {/* {verificationSent ? ( */}
                <TextField
                  fullWidth
                  name="otp"
                  label="OTP"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.otp}
                  disabled={isSubmitting}
                  error={touched.otp && Boolean(errors.otp)}
                  helperText={touched.otp && errors.otp}
                  sx={{ gridColumn: "span 100" }}
                />

                <Button type="submit" variant="contained" color="primary">
                  Verify OTP
                </Button>
              </form>
            </Box>
          </Container>
        </Paper>
      )}
    </Formik>
  );
};

export default EmailOtpForm;
