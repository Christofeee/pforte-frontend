"use client"
import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, Grid, Typography, Box, CircularProgress, Backdrop } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import getClasses from './getClasses';
import getUsers from '../../accounts/components/getUsers';
import getClassUsers from './getClassUsers';
import deleteClass from './deleteClass';
import deleteClassUser from './deleteClassUser';

import CreateClassModal from './createClassModal';
import EditClassModal from './editClassModal';
import PutClassMembers from './putClassMembers';

export default function ManageClassrooms() {
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [classUsers, setClassUsers] = useState([]);
    const [enterClass, setEnterClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedClassUsers, setSelectedClassUsers] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(true); // Initialize loading state as true

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

    const handleClassDelete = async (classId) => {
        try {
            setDeleting(true);
            await deleteClass(classId);
            setClasses(classes.filter(c => c.classroom_id !== classId));
        } catch (error) {
            console.error('Error deleting class:', error);
        } finally {
            setDeleting(false);
        }
    };

    const handleClassUserDelete = async (classUserId) => {
        try {
            setDeleting(true);
            await deleteClassUser(classUserId);
            setSelectedClassUsers(selectedClassUsers.filter(user => user.classroom_user_id !== classUserId));
            setClassUsers(classUsers.filter(cu => cu.classroom_user_id !== classUserId));
        } catch (error) {
            console.error('Error deleting class user:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            {loading && ( // Conditionally render loading spinner if loading state is true
                <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: '#8a2ce2' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {!enterClass ? (
                <Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        Manage Classes
                    </Typography>
                    <Box sx={{ textAlign: 'right', marginBottom: 3 }}>
                        <CreateClassModal />
                    </Box>
                    <Grid container spacing={3}>
                        {classes.map((classItem) => (
                            <Grid item xs={12} sm={6} md={6} key={classItem.classroom_id}>
                                <Card>
                                    <CardContent onClick={() => handleEnterClass(classItem)}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
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
                                        <Button
                                            size="small"
                                            onClick={() => handleClassDelete(classItem.classroom_id)}
                                            color="secondary"
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </Button>
                                        <EditClassModal classItem={classItem} onSave={(updatedClass) => handleClassEdit(classItem.classroom_id, updatedClass)} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <Button onClick={handleShowClasses} startIcon={<ArrowBackIosIcon />}>
                        Back to Classes
                    </Button>
                    <Typography variant="h5" align="center" gutterBottom>
                        Manage Users In {selectedClass.name}
                    </Typography>
                    <Box sx={{ textAlign: 'right', marginBottom: 3 }}>
                        <PutClassMembers users={users} classId={selectedClass.classroom_id} />
                    </Box>
                    <Grid container spacing={3}>
                        {selectedClassUsers.map(user => (
                            <Grid item xs={12} sm={6} md={4} key={user.classroom_user_id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {user.role}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => handleClassUserDelete(user.classroom_user_id)}
                                            color="secondary"
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}





{/* <div>
    <Typography variant="h5">Classes-Users</Typography>
    <ul>
        {classUsers.map((classUser, index) => (
            <li key={classUser.classroom_user_id} className='m-3 p-5 text-white-100 shadow'>
                <p>{classUser.classroom_id} -- {classUser.user_id}</p>
            </li>
        ))}
    </ul>
</div> */}

{/* <div>
    <Typography variant="h5">Users</Typography>
    <ul>
        {users.map((user, index) => (
            <li key={user.id} className='m-3 p-5 text-white-100 shadow'>
                <p>{user.firstName} {user.lastName} {user.role}</p>
            </li>
        ))}
    </ul>
</div> */}

// import Typography from '@mui/material/Typography';
// import Classes from './classes';

// export default function ManageClassrooms() {

//     return (
//         <main className="p-5">
//             <Typography className="text-center p-5" variant="h4">Classes</Typography>
//             <Classes />
//         </main >
//     );
// }