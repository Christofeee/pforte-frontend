"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
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

async function updateUser(userId, userData) {
    try {
        const response = await fetch(`/api/auth/update-user?id=${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        console.log('User updated successfully:');
        return data;
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        return data;
    }
}

export default function EditUserModal({ user, onSave }) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        if (user) {
            setData({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: '',
                role: user.role,
            });
        }
    }, [user]);

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
        try {
            const updatedUser = await updateUser(user.id, data);
            onSave(updatedUser);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleOpen} style={{ marginLeft: '0.5rem' }} disabled={false}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-modal-title"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="edit-modal-title" className='text-center'>Edit User</h2>
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
                            Update User
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
