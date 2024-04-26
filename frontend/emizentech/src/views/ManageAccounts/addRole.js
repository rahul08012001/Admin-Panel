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

  
 
});

const initialValuesRegister = {
  name: "",
 
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
      const response = await axios.post(`${end}/createRole`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        // setSubmitting(false);
        toast.success("Success Add Role !");

        console.log(response.data);
        setTimeout(async () => {
          navigate("/Role");
        }, 5500);
      }
      if(response.status===400){
        console.log("please not enter dublicate Role");
      }
  
    } catch (error) {
      console.log("error", error);

     
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
                  Add Role
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="20px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Role"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
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
