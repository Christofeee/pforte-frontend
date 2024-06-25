import { useState, useEffect } from 'react';
import getUsers from './getUsers'; // Assuming getUsers fetches user data
import deleteUser from './deleteUser';
import EditUserModal from './editUserModal';
import CreateUserModal from './createUserModal';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Checkbox,
    FormControl,
    CircularProgress,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    IconButton,
    Tooltip,
    FormControlLabel,
    FormGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputLabel } from '@mui/material';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
    const [refechUsers, SetRefectUsers] = useState(false);

    // State for confirmation dialogs
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [confirmDeleteSelectedDialogOpen, setConfirmDeleteSelectedDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refechUsers]);

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
            setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteSelected = () => {
        setConfirmDeleteSelectedDialogOpen(true);
    };

    const handleConfirmDeleteSelectedClose = () => {
        setConfirmDeleteSelectedDialogOpen(false);
    };

    const handleDeleteSelectedConfirmed = async () => {
        setDeleting(true);
        const selectedUserIds = Array.from(selectedUsers);
        try {
            await Promise.all(selectedUserIds.map(userId => deleteUser(userId)));
            setUsers(users.filter(user => !selectedUsers.has(user.id)));
            setSelectedUsers(new Set());
            setSelectAll(false);
        } catch (error) {
            console.error('Error deleting users:', error);
            // Handle error (e.g., show a message to the user)
        } finally {
            setDeleting(false);
            setConfirmDeleteSelectedDialogOpen(false);
        }
    };

    const handleDeleteConfirmation = (userId) => {
        setUserToDelete(userId);
        setConfirmDialogOpen(true);
    };

    const handleConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
        setUserToDelete(null);
    };

    const handleUserDelete = async () => {
        try {
            setDeleting(true);
            await deleteUser(userToDelete);
            setUsers(users.filter(user => user.id !== userToDelete));
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setDeleting(false);
            handleConfirmDialogClose();
        }
    };

    const handleUserEdit = (userId, updatedUser) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    role: updatedUser.role
                };
            }
            return user;
        }));
        if (!refechUsers) {
            SetRefectUsers(true)
        } else {
            SetRefectUsers(false)
        }
        setEditModalOpen(false);
    };

    const handleEditModalOpen = (user) => {
        setSelectedUserForEdit(user);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedUserForEdit(null);
    };

    const filteredUsers = users.filter(user => {
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const matchesSearchTerm = firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === '' || user.role === selectedRole;
        return matchesSearchTerm && matchesRole;
    });

    return (
        <>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Search by Firs or Last Name"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            fullWidth
                        >
                            <MenuItem value="">All Roles</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteSelected}
                        disabled={selectedUsers.size === 0 || deleting}
                        startIcon={<DeleteIcon />}
                        fullWidth
                    >
                        {deleting ? 'Deleting...' : 'Delete Selected'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <CreateUserModal fullWidth />
                </Grid>

                <Grid item xs={12}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    }
                                    label="Select All"
                                />
                                {selectedUsers.size > 0 && (
                                    <Typography variant="body2" color="textSecondary">
                                        {selectedUsers.size} user(s) selected
                                    </Typography>
                                )}
                            </FormGroup>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead
                                        sx={{
                                            boxShadow:3
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>Select</TableCell>
                                            <TableCell>First name</TableCell>
                                            <TableCell>Last name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredUsers.map(user => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.has(user.id)}
                                                        onChange={() => handleUserSelect(user.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{user.firstName}</TableCell>
                                                <TableCell>{user.lastName}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEditModalOpen(user)}>
                                                            <EditUserModal
                                                                user={user}
                                                                onSave={(updatedUser) => handleUserEdit(user.id, updatedUser)}
                                                                open={editModalOpen && selectedUserForEdit === user}
                                                                onClose={handleEditModalClose}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => handleDeleteConfirmation(user.id)} disabled={deleting}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Grid>
            </Grid>

            {/* Confirmation Dialog for single user delete */}
            <Dialog
                open={confirmDialogOpen}
                onClose={handleConfirmDialogClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUserDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for delete selected users */}
            <Dialog
                open={confirmDeleteSelectedDialogOpen}
                onClose={handleConfirmDeleteSelectedClose}
            >
                <DialogTitle>Confirm Delete Selected</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the selected users? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDeleteSelectedClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteSelectedConfirmed} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Users;
