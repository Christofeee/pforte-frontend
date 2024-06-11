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

async function createClassUsers(selectedUserIds, id) {
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

export default function PutClassMembers({ users , classId}) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        classroom_id: null,
        user_id: ''
    });

    //
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
        const matchesSearchTerm = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
    });
    //

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
        const selectedUserIds = Array.from(selectedUsers);
        // console.log(data)
        // setFormData(data);
        try {
            await createClassUsers(selectedUserIds, classId);
            // Optional: Add success message or close the modal
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <Button className='p-3 shadow' onClick={handleOpen} style={{ textTransform: 'none' }} variant='h4'>Add New Members</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title" className='text-center'>Add New Members</h2>
                    <div className="users" style={{ margin: '1rem', padding: '1rem' }}>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '1rem' }}
                        />
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <label style={{ marginLeft: '0.5rem' }}>Select All</label>
                            {selectedUsers.size > 0 && (
                                <span style={{ marginLeft: '1rem' }}>{selectedUsers.size} user(s) selected</span>
                            )}
                        </div>

                        <ul className="user-list" style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                            {filteredUsers.map(user => (
                                <li key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.has(user.id)}
                                        onChange={() => handleUserSelect(user.id)}
                                        style={{ marginRight: '1rem' }}
                                    />
                                    <span>
                                        {user.firstName} {user.lastName} ({user.role}) - {user.email}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSubmit} disabled={selectedUsers.size === 0} style={{ marginBottom: '1rem' }}>
                            Add
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
