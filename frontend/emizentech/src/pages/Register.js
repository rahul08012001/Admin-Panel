

import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
const registerSchema = yup.object().shape({
    name: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
    mobile: yup.string().required('required'),
})

const initialValuesRegister = {
    name: '',
    email: '',
    password: '',
    mobile: '',
}

const FormRegister = () => {
    const { palette } = useTheme()
    const navigate = useNavigate()
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    
    const handleFormSubmit = async (values,{setSubmitting}) => {
      
        try{
        const url="http://localhost:8005/Register";
        const response =await axios.post(url,values,{
            headers: {
                "Content-Type": "application/json",
              },
        })
       
        if(response.data.status ===200){
            //   dispatch(loginSuccess({ token: response.data.token }));
            // tokenSave(response.data.token)
            console.log(response.data)
            navigate('/Login')
        } 
        else if(response.data.status===409){
            //   dispatch(loginFailure({ error: "Invalid credentials" }));
            console.log("Email is already exist");
        } 

     
    } catch(error){
        //  dispatch(loginFailure({ error: "An error occurred" }));
        console.log("error",error);
    }
    finally{
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
                    <Typography variant="h5" gutterBottom   > 
                    Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit} > 
                        <Box
                            display="grid"
                            gap="20px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            // sx={{
                            //     '& > div': { gridColumn: isNonMobile ? undefined : 'span 6' },
                            // }}
                        > 
                            <TextField
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={Boolean(touched.name) && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: 'span 6' }}
                            />
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
                            <TextField
                                label="Mobile"
                                type="mobile"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.mobile}
                                name="mobile"
                                error={Boolean(touched.mobile) && Boolean(errors.mobile)}
                                helperText={touched.mobile && errors.mobile}
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
                                {/* REGISTER */}
                                {isSubmitting ? "REGISTERING in..." : "REGISTER"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    navigate('/Login')
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
                                Already have an account? Login here
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


