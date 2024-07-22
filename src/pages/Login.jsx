import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CssBaseline,
  Avatar,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

// Theme customization
const theme = createTheme();

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ setValue }) => {
      
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Formik
            initialValues={{ name: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
            try{const res = await axios.post("http://localhost:8000/login",values, {withCredentials: true});
              console.log("login", res);
                localStorage.setItem('user', JSON.stringify(res.data))
            }
              catch(e){
                console.log("error in login" ,e);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="name"
                        variant="outlined"
                        fullWidth
                        label="Name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="password"
                        variant="outlined"
                        fullWidth
                        label="Password"
                        type="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <div
                        onClick={() => setValue(0)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                      >
                        Don't have an account? Sign up
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
