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

async function updateClass(classId, classData) {
    try {
        const response = await fetch(`/api/auth/classes/update?id=${classId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classData)
        });

        const data = await response.json();
        console.log('Class updated successfully:');
        return data;
    } catch (error) {
        console.error('Error updating class:', error.response?.data || error.message);
        return data;
    }
}

export default function EditClassModal({ classItem, onSave }) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (classItem) {
            setData({
                name: classItem.name,
                description: classItem.description
            });
        }
    }, [classItem]);

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
            const updatedClass = await updateClass(classItem.id, data);
            onSave(updatedClass);
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
                    <h2 id="edit-modal-title" className='text-center'>Edit Class Info</h2>
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
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
