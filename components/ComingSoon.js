
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ComingSoon = () => {
  return (
    <Container className='rounded' maxWidth="md" sx={{ textAlign: 'center', paddingY: '10vh', backgroundColor: '#cac1ff' }}>
      <Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body" component="p" gutterBottom>
          We're working hard to bring you this feature!
        </Typography>
      </Box>
    </Container>
  );
};

export default ComingSoon;
