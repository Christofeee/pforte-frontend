"use client";

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

async function createUser(data) {
    try {
        const response = await fetch(`/api/auth/create-user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        );
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
    }
};

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)
        // setFormData(data);
        try {
            await createUser(data);
            // Optional: Add success message or close the modal
            handleClose();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <Button className='p-3 shadow' onClick={handleOpen} style={{ textTransform: 'none' }} variant='h4'>Create User +</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title" className='text-center'>Create User</h2>
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
                        <Button type="submit" variant="contained" color="primary">
                            Create User
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
