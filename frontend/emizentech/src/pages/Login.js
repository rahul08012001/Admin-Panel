import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  useTheme,
  Container,
  Avatar,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "Enter must be 6 digits Strong password!"),
});

const initialValuesRegister = {
  email: "",
  password: "",
};

const FormRegister = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paperStyle = { padding: "50px 30px", width: 350, margin: "20px auto" };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const end = process.env.REACT_APP_API_URL;

      console.log("process.env.login", process.env.REACT_APP_API_URL);
      const response = await axios.post(`${end}/Login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 200) {
       
        dispatch(loginSuccess({ token: response.data.token }));
        tokenSave(response.data.token);
        saveUserData(response.data)
        console.log("response.data.token", response.data);
        toast.success("Success Login !");
      

        setTimeout(() => {
          navigate("/Home");
        }, 5500);
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
  const saveUserData = (data) => {
   
    const userDataString = JSON.stringify(data);
    
    localStorage.setItem('user', userDataString);
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
        resetForm,
        isSubmitting,
      }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh" // Make the container full height
          margin="auto" // Center the container horizontally
          p={4} // Add margin from all sides
        >
         
          <Paper elevation={20} style={paperStyle}>  
            <Container style={{ justifyContent: "center", marginLeft: "50" }}>
            <Avatar alt="Remy Sharp"sx={{ width: 50, height: 50, mx: "auto", mb: 2 }} src="/static/images/avatar/2.jpg" />
          
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>
            </Container>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
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
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/Otpsend");
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
