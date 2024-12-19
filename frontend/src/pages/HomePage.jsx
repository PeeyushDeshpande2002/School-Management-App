import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Paper } from '@mui/material';
import Students from "../assets/students.svg";
import { useSelector } from 'react-redux';

const Homepage = () => {
    const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    // Redirect logged-in users to their dashboard
    if (user) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [user, navigate]);
    return (
        <Container
        maxWidth = 'xl'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
                //backgroundColor: 'white',
                margin: 0,
                padding: 0,
            }}
        >
            <Grid container spacing={0} sx={{ boxShadow: 'none' }}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '90%', height : '70%', marginTop : '2.5rem' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        elevation={0}
                        sx={{ 
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            boxShadow: 'none',
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: '#252525',
                                marginBottom: 2,
                            }}
                        >
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                marginTop: 3,
                                marginBottom: 3,
                                lineHeight: 1.6,
                                color: 'text.secondary',
                            }}
                        >
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                padding: 3,
                            }}
                        >
                            <Link to="/role" style={{ textDecoration: 'none', width: '100%' }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#7f56da',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#6e4ec7',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Homepage;
