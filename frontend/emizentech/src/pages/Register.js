import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  // useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useHistory } from 'react-router-dom';
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "Enter must be 6 digits Strong password!"),
  mobile: yup
    .string()
    .required("required")
    .min(10, "Too Short!")
    .max(10, "Too Long !")
    .max(10, "Too Long!"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  role:""
};

const FormRegister = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  // const history = useHistory();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const paperStyle = { padding: "30px 20px", width: 350, margin: "20px auto" };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      // values.role = "Admin";
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${end}/Register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        // setSubmitting(false);
        toast.success("Success Register !");

        console.log(response.data);
        setTimeout(async () => {
          navigate("/Login");
        }, 5500);
      }
    } catch (error) {
      // if(error){
      //   toast.error('Registration failed. Please try again.');
      // }

      console.log("error", error);

      if (error.response.data.status === 409) {
        toast.error("Registration failed. Email is already exist");

        console.log("Email is already exist");
      }
    } finally {
      setSubmitting(false);
    }

    console.log("setTimeout");
  };

  return (
    <div>
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
            height="100vh" // Make the container full height
            margin="auto" // Center the container horizontally
            p={4} // Add margin from all sides
          >
            <Paper elevation={20} style={paperStyle}>
              <Typography variant="h5" gutterBottom>
                Sign Up
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
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    label="Mobile"
                    type="mobile"
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
                  {/* Add margin from the top */}
                  <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "16px" }}
                >
                  Register
                </Button>
                  <Typography
                    onClick={() => {
                      navigate("/Login");
                      resetForm();
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.light,
                      },
                    }}
                  >
                    Already have an account? Login here
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default FormRegister;
