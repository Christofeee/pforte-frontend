import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    border: 'none', // Remove the solid border
    boxShadow: 24,
    overflowY: 'auto',
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px', // Add this line
};

async function updateUser(userId, userData) {
    try {
        console.log(userData)
        const response = await fetch(`/api/auth/update-user?id=${userId}`, {
            method: "PUT",
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
                throw new Error(data.message || 'Error updating user');
            }
        }

        console.log('User updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
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
    const [error, setError] = useState('');

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
        setError('');
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
        } catch (error) {
            if (error.message === 'Username or email is already taken') {
                setError('Username or email is already taken');
            } else {
                setError(error.message || 'An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <EditIcon onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-modal-title"
            >
                <Box sx={style}>
                    <h2 id="edit-modal-title" className='text-center'>Edit User</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Box sx={{ overflowY: 'auto', padding: 2, borderRadius: '10px' }}> {/* Add padding and border radius */}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="User Name"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                required
                                margin="normal"
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
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
                                    disabled
                                >
                                    <MenuItem value="">Select User Type</MenuItem>
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                </Select>
                            </FormControl>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button type="submit" variant="contained" color="primary">
                                    Update User
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
