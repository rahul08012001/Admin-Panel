

import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    useTheme,
    Container,
} from '@mui/material'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { loginSuccess,loginFailure } from '../redux/authSlice'

const registerSchema = yup.object().shape({
   
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
   
})

const initialValuesRegister = {
   
    email: '',
    password: '',
   
}

const FormRegister = () => {
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
   

    const handleFormSubmit = async (values,{setSubmitting}) => {
      
        try{
        const url="http://localhost:8005/Login";
        const response =await axios.post(url,values,{
            headers: {
                "Content-Type": "application/json",
              },
        })
       
        if(response.data.status ===200){
              dispatch(loginSuccess({ token: response.data.token }));
            tokenSave(response.data.token)
            console.log("response.data.token",response.data)
            navigate('/Admin')
        } else if(response.data.status===402){
              dispatch(loginFailure({ error: "Invalid credentials" }));
            console.log("Invalid credentials");
        } 

     
    } catch(error){
         dispatch(loginFailure({ error: "An error occurred" }));
        console.log("error",error);
    }
    finally{
        setSubmitting(false);
    }
};
const tokenSave=(token)=>{
    localStorage.setItem("token",token)
}
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
                isSubmitting
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
                    <Container style={{justifyContent:"center",marginLeft:"50"}}>
                    <Typography variant="h5" gutterBottom > 
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
                                sx={{ gridColumn: 'span 6' }}
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
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    navigate('/Otpsend')
                                    resetForm()
                                }}
                                sx={{
                                    textDecoration: 'underline',
                                    color: palette.primary.main,
                                    '&:hover': {
                                        cursor: 'pointer',
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
        
    )
}

export default FormRegister


