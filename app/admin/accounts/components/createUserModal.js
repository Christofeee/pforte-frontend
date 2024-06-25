"use client";

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
    textTransform: 'none',
    padding: '.6rem', // Adjust padding for a larger button
    borderRadius: '8px', // Rounded corners
    backgroundColor: 'transparent', // Transparent background
    color: 'black', // White text color
    '&:hover': {
        backgroundColor: '#ffffff', // White background on hover
        color: '#1976d2', // Blue text color on hover
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: '80vh',
    overflowY: 'auto',
};

async function createUser(userData) {
    try {
        const response = await fetch(`/api/auth/create-user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Username or email is already taken');
            } else {
                throw new Error(data.message || 'Error creating user');
            }
        }

        console.log('User Created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export default function CreateUserModal() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createUser(data);
            setLoading(false);
            handleClose();
            window.location.reload();
        } catch (error) {
            setLoading(false);
            if (error.message === 'Unexpected end of JSON input') {
                setError('Username or email is already taken or unexpected input');
            } else {
                setError(error.message || 'An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <StyledButton onClick={handleOpen} variant="contained">Add User</StyledButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style }}>
                    <h2 id="parent-modal-title" className='text-center'>Create User</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User Name"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                            type="email"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                            type="password"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">User Type</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="">Select User Type</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Create User'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
