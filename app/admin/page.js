import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";
import { Box, Typography } from "@mui/material";
import RouteButton from "./components/routeButton";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <Box sx={{ textAlign: 'center', padding: '40px', fontFamily: 'Roboto, sans-serif' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 300, letterSpacing: '2px' }}>
          Admin Management
        </Typography>
        <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <RouteButton path='/admin/announcements' buttonName='Announcements' />
          <RouteButton path='/admin/classrooms' buttonName='Classrooms' />
          <RouteButton path='/admin/accounts' buttonName='Accounts' />
        </Box>
      </Box>
    </AuthCheck>
  );
}
