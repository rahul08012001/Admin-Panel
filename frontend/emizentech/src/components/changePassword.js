

  import { Box,Paper,Button,TextField,Typography,useTheme} from '@mui/material'
  import { Formik } from 'formik'
  import { useNavigate } from 'react-router-dom'
  import * as Yup from 'yup'
  import axios from 'axios'
  import Dashboard from "./Dashboard"
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  const registerSchema = Yup.object().shape({
    Old_password: Yup.string().required('Password is required').min(6, 'Enter must be 6 digits Strong password!'),
    New_password: Yup.string().required('Password is required').min(6, 'Enter must be 6 digits Strong password!')
   
  })
const initialValuesRegister = {
   Old_password: '',
    New_password:'',
   }
  
  const FormRegister = () => {
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    console.log("token",token);
    const paperStyle = { padding: '70px 50px', width: 375, margin: "20px auto" }
   
  const handleFormSubmit = async (values,{setSubmitting}) => {
      console.log(values);
      try{
        const end = process.env.REACT_APP_API_URL;
      //  const url ="http://localhost:8005/changePassword"
        const respose=await axios.post(`${end}/changePassword`,values,{
          headers:{
             "Content-Type": "application/json",
             "Authorization": token
          }
        })
        console.log(respose.status);
       if(respose.status===200){
          console.log(respose.data);
          toast.success("Change Password Success  !");
          setTimeout(() => {
            navigate('/Login')
          }, 5500);
          localStorage.removeItem("token");
    // localStorage.setToken(null);
          
          
        }
       else if(respose.status===400){
          console.log("password doesn't match",respose.status)
        }
      }catch(error){
        toast.error('Old Password Wrong.');
        console.log('server  error ',error);
      } finally{
        setSubmitting(false);
      }
   
  };
  
    return (
        <>
        <Dashboard />
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
             
                isSubmitting
            }) => (
           
  
              <div style={{ marginTop: '1px' }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh" // Make the container full height
                    margin="auto" // Center the container horizontally
                    p={4} // Add margin from all sides
                >
                    <Paper elevation={20} style={paperStyle}>
                    <Typography variant="h5" gutterBottom   > 
                      Change password
                      </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="20px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                           
                        > 
                        
                            
                            <TextField
                                label=" Old Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="Old_password"
                                error={Boolean(touched.Old_password) && Boolean(errors.Old_password)}
                                helperText={touched.Old_password && errors.Old_password}
                                sx={{ gridColumn: 'span 6' }}
                            />
                             <TextField
                                label="New Password"
                                type="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Password}
                                name="New_password"
                                error={Boolean(touched.New_password) && Boolean(errors.New_password)}
                                helperText={touched.New_password && errors.New_password}
                                sx={{ gridColumn: 'span 6' }}
                            />
                           
                        </Box>
                        <Box mt={1}> {/* Add margin from the top */}
                            <Button
                                fullWidth
                                type="submit"
                                disabled={isSubmitting}
                                sx={{
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    '&:hover': { color: palette.primary.main },
                                }}
                            >
                                {isSubmitting ? "Logging in..." : "Change Password"}
                            </Button>
                          
                        </Box>
                    </form>
                    </Paper>
                </Box>
                </div>
            )}
           
        </Formik>
        </>
    )
  }
  
  export default FormRegister
  
  
  