"use client"

import Typography from '@mui/material/Typography';
import CreateUserModal from './createUserModal';
import Users from './users';

export default function Management() {
  return (
    <main className="p-5">
      <Typography className="text-center p-5" variant="h4">Account Management</Typography>
      <div className='text-end p-5'>
        <CreateUserModal/>
      </div>
      <div className='shadow rounded p-5'>
        <Users />
      </div>
    </main >
  );
}