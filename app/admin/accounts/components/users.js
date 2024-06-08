"use client";

import { useState, useEffect } from 'react';
import getUsers from './getUsers'; // Assuming getUsers fetches user data
import deleteUser from './deleteUser';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(new Set()); // State for selected users
    const [selectAll, setSelectAll] = useState(false); // State for select all
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        };

        fetchData();
    }, []);

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
        // Placeholder for delete API call
        console.log('Delete users with IDs:', Array.from(selectedUsers));
        // After successful deletion, update the user list
        setUsers(users.filter(user => !selectedUsers.has(user.id)));
        setSelectedUsers(new Set());
        setSelectAll(false);
    };

    const handleUserDelete = async (userId) => {
        console.log("Deleting user")
        try {
            await deleteUser(userId);
            // Optional: Add success message or close the modal
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const handleUserEdit = (userId, updatedUser) => {
        // Placeholder for edit API call
        console.log(`Edit user with ID: ${userId}`, updatedUser);
        // After successful edit, update the user list
        setUsers(users.map(user => user.id === userId ? updatedUser : user));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearchTerm = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === '' || user.role === selectedRole;
        return matchesSearchTerm && matchesRole;
    });

    return (
        <div className="users" style={{ margin: '1rem', padding: '1rem' }}>
            <input
                type="text"
                className="search-bar"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '1rem' }}
            />
            <select className="role-select" value={selectedRole} onChange={handleRoleChange} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '1rem' }}>
                <option value="">All Roles</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
            </select>
            <button onClick={handleDeleteSelected} disabled={selectedUsers.size === 0} style={{ marginBottom: '1rem' }}>
                Delete Selected
            </button>
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
            {loading ? (
                <div>Loading...</div>
            ) : (
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
                            <button onClick={() => handleUserDelete(user.id)} style={{ marginLeft: '1rem' }}>Delete</button>
                            <button onClick={() => handleUserEdit(user.id, { ...user, firstName: 'EditedFirstName' })} style={{ marginLeft: '0.5rem' }}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
