"use client";

import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '50vw',
    minWidth: '50vw',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: '80vh',
    overflowY: 'auto',
};
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

async function createClassUsers(selectedUserIds, id) {
    console.log("CLASS ID HERE PR: ", id)
    try {
        const response = await fetch(`/api/auth/classes/put-members?id=${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedUserIds)
        });

        const data = await response.json();
        console.log('Class-Users Created successfully:');
        return data;
    } catch (error) {
        console.error('Error creating class-users:', error.response?.data || error.message);
        return data;
    }
}

export default function PutClassMembers({ users, classId, usersInClass }) {
    console.log("CLASS ID in componentmodal : ", classId)
    console.log("USERS IN CLASS:", usersInClass)
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(new Set()); // State for selected users
    const [selectAll, setSelectAll] = useState(false); // State for select all

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prevSelectedUsers => {
            const newSelectedUsers = new Set(prevSelectedUsers);
            if (newSelectedUsers.has(userId)) {
                newSelectedUsers.delete(userId);
            } else {
                newSelectedUsers.add(userId);
            }
            return newSelectedUsers;
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
        }
        setSelectAll(!selectAll);
    };

    const filteredUsers = users.filter(user => {
        const isInClass = usersInClass.some(classUser => classUser.id === user.id);
        const matchesSearchTerm = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        return !isInClass && matchesSearchTerm;
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedUserIds = Array.from(selectedUsers);
        try {
            await createClassUsers(selectedUserIds, classId);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <StyledButton onClick={handleOpen} variant="contained">Add new Members</StyledButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={style}>
                    <Typography id="parent-modal-title" variant="h6" className='text-center'>Add New Members</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                            label="Select All"
                        />
                        {selectedUsers.size > 0 && (
                            <Typography variant="body2" sx={{ ml: 2 }}>{selectedUsers.size} user(s) selected</Typography>
                        )}
                        <List>
                            {filteredUsers.map(user => (
                                <ListItem key={user.id} sx={{ borderBottom: '1px solid #ddd' }}>
                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName} (${user.role})`}
                                        secondary={user.email}
                                    />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            checked={selectedUsers.has(user.id)}
                                            onChange={() => handleUserSelect(user.id)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            disabled={selectedUsers.size === 0}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
