// components/Unauthorized.js
import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container 
      maxWidth={false} 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography component="div" sx={{ fontSize: '2rem', margin: 0 }}>
          401
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#fff' }} />
        <Typography component="div" sx={{ fontSize: '1rem', margin: 0 }}>
          You are Unauthorized to access this page.
        </Typography>
      </Box>
    </Container>
  );
};

export default Unauthorized;
