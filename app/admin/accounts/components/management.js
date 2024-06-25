"use client"

import Typography from '@mui/material/Typography';
import CreateUserModal from './createUserModal';
import Users from './users';
import AdminHomeButton from '../../components/AdminHomeButton';

export default function Management() {
  return (
    <main className="p-5">
      <div className='flex items-center justify-between'>
        <AdminHomeButton path='/admin'/>
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Account Management</Typography>
      </div>
      <div className='shadow rounded p-5'>
        <Users />
      </div>
    </main >
  );
}