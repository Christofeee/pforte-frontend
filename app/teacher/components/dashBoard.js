import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import Classes from './classes';
import AssessmentStatus from './assessmentStatus';

export default function Dashboard({ userID }) {
  return (
    <Container className='py-5'>
      {/* <Container style={{ padding: '10px', backgroundColor: 'lightgrey' }}>
        <Typography variant="h6">Admin Announcements</Typography>
        <Typography variant="body2">Coming Soon</Typography>
      </Container> */}
      <Grid container spacing={2} className='p-5'>
        <Grid item md={6} sm={6} xs={12}>
          <div>
            <Classes userID={userID} />
          </div>
        </Grid>
        <Grid item md={6} sm={6} xs={12} style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <AssessmentStatus />
            <Button
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            >Comming Soon</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
