import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Classes from './classes';

export default function Dashboard() {
  return (
    <Container className='py-5'>
      <Container style={{padding:'50px', backgroundColor:'lightgrey'}}>
        <Typography variant="h4">Admin Announcements</Typography>
        <Typography variant="h6">Coming Soon</Typography>
      </Container>
      <Grid container spacing={2} className='p-5'>
        <Grid item md={6} sm={6} xs={12}>
          <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '16px', backgroundColor: 'lightblue' }}>
            <Classes />
          </div>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '16px', backgroundColor: 'lightgreen' }}>
            Assessments
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
