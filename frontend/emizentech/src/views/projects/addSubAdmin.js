import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../components/Dashboard";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  mobile: yup.string().required("required"),
  
 
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "Enter must be 6 digits Strong password!"),
});

const initialValuesRegister = {
  name: "",
  email:"",
  mobile: "",
  
  password:"",
  role:"Subadmin"
};

const FormRegister = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const paperStyle = { padding: "30px 20px", width: 450, margin: "20px auto" };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      values.role = "Subadmin";
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${end}/addEmployee`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        // setSubmitting(false);
        toast.success("Success Add User !");

        console.log(response.data);
        // setTimeout(async () => {
        //   navigate("/Projects");
        // }, 5500);
      }
      if(response.status===400){
        console.log("please not enter dublicate employeeId");
      }
      if(response.status===409){
        console.log("email is already exist");
      }
    } catch (error) {
      console.log("error", error);

      if (error.response.data.status === 400) {
        toast.error("employeeId is already exist");
      }
    } finally {
      setSubmitting(false);
    }

    console.log("setTimeout");
  };

  return (
    <>
    <Dashboard />
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
                  Add User
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
                      value={values.job}
                      name="mobile"
                      error={Boolean(touched.mobile) && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
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
                        Boolean(touched.password) &&
                        Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
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
                      Add User
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
