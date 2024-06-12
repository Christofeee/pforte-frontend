import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Classes from './classes';

export default function Dashboard({ userID }) {
  return (
    <Container className='py-5'>
      <Container style={{ padding: '10px', backgroundColor: 'lightgrey' }}>
        <Typography variant="h6">Admin Announcements</Typography>
        <Typography variant="body2">Coming Soon</Typography>
      </Container>
      <Grid container spacing={2} className='p-5'>
        <Grid item md={6} sm={6} xs={12}>
          <div >
            <Classes userID={userID} />
          </div>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <div>
            Assessments
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
