"use client";
import React, { useState, useEffect } from 'react';
import {
    Button, Card, CardContent, CardActions, Grid, Typography, Box, CircularProgress, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, Checkbox, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControlLabel, FormGroup, IconButton, Tooltip
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';

import getClasses from './getClasses';
import getUsers from '../../accounts/components/getUsers';
import getClassUsers from './getClassUsers';
import deleteClass from './deleteClass';
import deleteClassUser from './deleteClassUser';

import AdminHomeButton from '../../components/AdminHomeButton';
import CreateClassModal from './createClassModal';
import EditClassModal from './editClassModal';
import PutClassMembers from './putClassMembers';
import { styled } from '@mui/system';
import { InputLabel } from '@mui/material';

const StyledButton = styled(Button)({
    textTransform: 'none',
    padding: '.6rem', // Adjust padding for a larger button
    borderRadius: '8px', // Rounded corners
    backgroundColor: 'transparent', // Transparent background
    color: 'black', // Black text color
    boxShadow: 24,
    '&:hover': {
        backgroundColor: '#ffffff', // White background on hover
        color: '#1976d2', // Blue text color on hover
    },
});

export default function ManageClassrooms() {
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [classUsers, setClassUsers] = useState([]);
    const [enterClass, setEnterClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedClassUsers, setSelectedClassUsers] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(true); // Initialize loading state as true
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteClassUserDialogOpen, setDeleteClassUserDialogOpen] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);
    const [classUserToDelete, setClassUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true before fetching data

                const classesData = await getClasses();
                setClasses(classesData);

                const usersData = await getUsers();
                setUsers(usersData);

                const classUsersData = await getClassUsers();
                setClassUsers(classUsersData);

                setLoading(false); // Set loading state to false after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, []);

    const handleEnterClass = (classItem) => {
        setSelectedClass(classItem);
        setEnterClass(true);

        const fetchClassUsersForClass = async () => {
            try {
                const data = await getClassUsers();
                setClassUsers(data);

                const filteredClassUsers = data.filter(cu => cu.classroom_id === classItem.classroom_id);
                const usersInClass = filteredClassUsers.map(fcu => {
                    const user = users.find(u => u.id === fcu.user_id);
                    return { ...user, classroom_user_id: fcu.classroom_user_id };
                });

                setSelectedClassUsers(usersInClass);
            } catch (error) {
                console.error('Error fetching class users:', error);
            }
        };

        fetchClassUsersForClass();
    };

    const handleShowClasses = () => {
        setEnterClass(false);
        setSelectedClass(null);
        setSelectedClassUsers([]);
    };

    const handleClassEdit = (classId, updatedClass) => {
        setClasses(classes.map(c => c.classroom_id === classId ? updatedClass : c));
    };

    const handleClassDelete = async () => {
        try {
            setDeleting(true);
            await deleteClass(classToDelete.classroom_id);
            setClasses(classes.filter(c => c.classroom_id !== classToDelete.classroom_id));
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting class:', error);
        } finally {
            setDeleting(false);
        }
    };

    const handleClassUserDelete = async () => {
        try {
            setDeleting(true);
            await deleteClassUser(classUserToDelete.classroom_user_id);
            setSelectedClassUsers(selectedClassUsers.filter(user => user.classroom_user_id !== classUserToDelete.classroom_user_id));
            setClassUsers(classUsers.filter(cu => cu.classroom_user_id !== classUserToDelete.classroom_user_id));
            setDeleteClassUserDialogOpen(false);
        } catch (error) {
            console.error('Error deleting class user:', error);
        } finally {
            setDeleting(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
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
            setSelectedUsers(new Set(filteredUsers.map(user => user.classroom_user_id)));
        }
        setSelectAll(!selectAll);
    };

    const filteredClasses = classes.filter(classItem => {
        const matchesSearchTerm = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || classItem.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
    });

    const filteredUsers = selectedClassUsers.filter(user => {
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const matchesSearchTerm = firstName.toLowerCase().includes(searchTerm.toLowerCase()) || lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === '' || user.role === selectedRole;
        return matchesSearchTerm && matchesRole;
    });

    return (
        <Box sx={{ padding: 4 }}>
            {loading && ( // Conditionally render loading spinner if loading state is true
                <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: '#8a2ce2' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {!enterClass ? (
                <Box>
                    <div className='flex items-center justify-between pb-5'>
                        <AdminHomeButton path='/admin' />
                        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>Manage Classes</Typography>
                    </div>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Search Classes"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CreateClassModal fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ marginTop: 2 }}>
                        {filteredClasses.map((classItem) => (
                            <Grid item xs={12} sm={6} md={6} key={classItem.classroom_id}>
                                <Card elevation={3} className='p-3'>
                                    <CardContent onClick={() => handleEnterClass(classItem)}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item className='py-5'>
                                                <Typography variant="h6">{classItem.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {classItem.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button size="small" startIcon={<ArrowForwardIosIcon />} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <StyledButton
                                            onClick={() => {
                                                setClassToDelete(classItem);
                                                setDeleteDialogOpen(true);
                                            }}
                                            disabled={deleting}
                                            variant='contained'
                                        >
                                            <DeleteIcon />
                                        </StyledButton>
                                        <EditClassModal classItem={classItem} onClassEdit={handleClassEdit} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <div className='flex items-center justify-between pb-5'>
                        <IconButton onClick={handleShowClasses}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>{selectedClass.name}</Typography>
                    </div>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Search Users"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    label="Filter by role"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value="">All Roles</MenuItem>
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <PutClassMembers users={users} classId={selectedClass.classroom_id} usersInClass={selectedClassUsers} />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead
                                sx={{
                                    boxShadow: 3
                                }}
                            >
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Role</b></TableCell>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell align="right"><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.classroom_user_id}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Remove from class">
                                                <IconButton
                                                    onClick={() => {
                                                        setClassUserToDelete(user);
                                                        setDeleteClassUserDialogOpen(true);
                                                    }}
                                                    disabled={deleting}
                                                    size='large'
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Class</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this class? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleClassDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteClassUserDialogOpen}
                onClose={() => setDeleteClassUserDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove User from Class</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this user from the class? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteClassUserDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleClassUserDelete} color="primary" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
