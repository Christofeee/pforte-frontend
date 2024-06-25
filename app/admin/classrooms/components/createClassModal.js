"use client";

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
    textTransform: 'none',
    padding: '.6rem', // Adjust padding for a larger button
    borderRadius: '8px', // Rounded corners
    backgroundColor: 'transparent', // Transparent background
    color: 'black', // Black text color
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

async function createClass(classData) {
    try {
        const response = await fetch(`/api/auth/classes/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error creating class');
        }

        console.log('Class Created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating class:', error);
        throw error;
    }
}

export default function CreateClassModal() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        description: ''
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
            await createClass(data);
            setLoading(false);
            handleClose();
            window.location.reload();
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <div>
            <StyledButton onClick={handleOpen} variant="contained">Create Class</StyledButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style }}>
                    <h2 id="parent-modal-title" className='text-center'>Create Class</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Class Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                            margin="normal"
                            fullWidth
                        />
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Create Class'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
