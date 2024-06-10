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
        console.log('Class Created successfully:');
        return data;
    } catch (error) {
        console.error('Error creating class:', error.response?.data || error.message);
        return data;
    }
}

export default function createClassModal() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        description: ''
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
        // console.log(data)
        // setFormData(data);
        try {
            await createClass(data);
            // Optional: Add success message or close the modal
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <Button className='p-3 shadow' onClick={handleOpen} style={{ textTransform: 'none' }} variant='h4'>Create Class +</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title" className='text-center'>Create Class</h2>
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
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
