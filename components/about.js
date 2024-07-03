"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

const About = () => {
  const router = useRouter();

  return (
    <>
      <Box sx={{ maxWidth: '1024px', margin: '0 auto', padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#6a5bcd' }}>
            P F O R T E `
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#6a5bcd', borderRadius: '20px', padding: '10px 20px' }}
            onClick={() => router.push("/")}
          >
            Get Started
          </Button>
        </Box>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.6 }}>
              Welcome to PForte, your comprehensive platform for education management. Our platform offers dedicated views for Admins, Students, and Teachers, providing tailored experiences for each role.
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: '#98fb98', borderRadius: '10px', boxShadow: 3 }} elevation={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Classroom Management</Typography>
                  <Typography sx={{ color: '#777' }}>
                    Create and manage classrooms with structured modules and assessments to enhance learning.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: '#98fb98', borderRadius: '10px', boxShadow: 3 }} elevation={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Modules and Assessments</Typography>
                  <Typography sx={{ color: '#777' }}>
                    Organize your course content into modules, each containing assessments to track progress.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: '#98fb98', borderRadius: '10px', boxShadow: 3 }} elevation={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Mark Dashboard</Typography>
                  <Typography sx={{ color: '#777' }}>
                    View comprehensive mark dashboards displaying total marks for classes, modules, and individual assessments.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: '#98fb98', borderRadius: '10px', boxShadow: 3 }} elevation={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Admin Account Management</Typography>
                  <Typography sx={{ color: '#777' }}>
                    As an admin, you have full control over operations for user accounts.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '400px', position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: 3 }}>
              <Image
                src="/assets/images/welcome_bg.jpg"
                alt="Welcome Background"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
