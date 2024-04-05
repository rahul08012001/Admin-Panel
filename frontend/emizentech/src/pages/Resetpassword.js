import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const FormRegister = () => {
  const { palette } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const paperStyle = { padding: "60px 60px", width: 350, margin: "20px auto" };

  const emailid = new URLSearchParams(location.search).get("email");

  const initialValuesRegister = {
    email: emailid || "",
    password: "",
    confirmPassword: "",
  };
  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const end = process.env.REACT_APP_API_URL;
      // const url ="http://localhost:8005/reset"
      const response = await axios.put(`${end}/reset`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);

      if (response.status === 200) {
        console.log(response.data);
        toast.success("forgot password Success  !");

        setTimeout(() => {
          navigate("/Login");
        }, 5500);
      }
    } catch (error) {
      console.log("happy error ", error.response.status);
      if (error.response.status === 400) {
        toast.error("Change Password failed. Email is not Register");
      }
    } finally {
      setSubmitting(false);
    }
  };

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
              Forgot password
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                {/* <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  disabled={true}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 6" }}
                /> */}

                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  label="confirmPassword"
                  type="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 6" }}
                />
              </Box>
              <Box mt={1}>
                {" "}
                {/* Add margin from the top */}
                <Button
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {isSubmitting ? "Logging in..." : "Reset"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
    </Formik>
  );
};

export default FormRegister;
