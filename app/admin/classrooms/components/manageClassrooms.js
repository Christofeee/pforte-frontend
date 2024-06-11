"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';

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

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getClasses();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        const fetchClassUsers = async () => {
            try {
                const data = await getClassUsers();
                setClassUsers(data);
            } catch (error) {
                console.error('Error fetching class users:', error);
            }
        };

        fetchClasses();
        fetchUsers();
        fetchClassUsers();
    }, []);

    const fetchClassUsers = async () => {
        try {
            const data = await getClassUsers();
            setClassUsers(data);
        } catch (error) {
            console.error('Error fetching class users:', error);
        }
    };

    const handleEnterClass = (classItem) => {
        setSelectedClass(classItem);
        setEnterClass(true);

        // Fetch the latest class users
        const fetchClassUsersForClass = async () => {
            try {
                const data = await getClassUsers();
                setClassUsers(data);

                // Filter classUsers to find users in the selected class
                const filteredClassUsers = data.filter(cu => cu.classroom_id === classItem.classroom_id);
                
                // Map the user IDs to user details
                const usersInClass = filteredClassUsers.map(fcu => {
                    const user = users.find(u => u.id === fcu.user_id);
                    return { ...user, classroom_user_id: fcu.classroom_user_id }; // Include the class user ID
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
            // Update state to remove the deleted user from the class
            setSelectedClassUsers(selectedClassUsers.filter(user => user.classroom_user_id !== classUserId));
            // Update classUsers state to reflect deletion
            setClassUsers(classUsers.filter(cu => cu.classroom_user_id !== classUserId));
        } catch (error) {
            console.error('Error deleting class user:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div>
            {!enterClass ? (
                <div>
                    <Typography className="text-center p-5" variant="h4">Manage Classes</Typography>
                    <div className='text-end p-5'>
                        <CreateClassModal />
                    </div>
                    <ul>
                        {classes.map((classItem) => (
                            <li key={classItem.classroom_id} className='m-3 p-5 text-white-100 shadow'>
                                <Typography variant="h5">{classItem.name}</Typography>
                                <p>{classItem.description}</p>
                                <Button onClick={() => handleEnterClass(classItem)}><ArrowForwardIosIcon /></Button>
                                <button onClick={() => handleClassDelete(classItem.classroom_id)} style={{ marginLeft: '1rem' }} disabled={deleting}>
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </button>
                                <EditClassModal classItem={classItem} onSave={(updatedClass) => handleClassEdit(classItem.classroom_id, updatedClass)} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <Button onClick={handleShowClasses}><ArrowBackIosIcon /></Button>
                    <div>
                        <Typography className="text-center p-5" variant="h5">Manage Users In {selectedClass.name}</Typography>
                        <div className='text-end p-5'>
                            <PutClassMembers users={users} classId={selectedClass.classroom_id} />
                        </div>
                        <ul>
                            {selectedClassUsers.map(user => (
                                <li key={user.classroom_user_id} className='m-3 p-5 text-white-100 shadow'>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <p>{user.role}</p>
                                    <button onClick={() => handleClassUserDelete(user.classroom_user_id)} style={{ marginLeft: '1rem' }} disabled={deleting}>
                                        {deleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
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