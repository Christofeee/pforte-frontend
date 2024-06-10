"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';

import getClasses from './getClasses';
import getUsers from '../../accounts/components/getUsers';
import getClassUsers from './getClassUsers';


export default function ManageClassrooms() {
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [classUsers, setClassUsers] = useState([]);
    const [enterClass, setEnterClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedClassUsers, setSelectedClassUsers] = useState([]);

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

    const handleEnterClass = (classItem) => {
        setSelectedClass(classItem);
        setEnterClass(true);

        // Filter classUsers to find users in the selected class
        const filteredClassUsers = classUsers.filter(cu => cu.classroom_id === classItem.classroom_id);

        // Map the user IDs to user details
        const usersInClass = filteredClassUsers.map(fcu => users.find(u => u.id === fcu.user_id));
        
        setSelectedClassUsers(usersInClass);
    };

    const handleShowClasses = () => {
        setEnterClass(false);
        setSelectedClass(null);
        setSelectedClassUsers([]);
    };

    return (
        <div>
            {!enterClass ? (
                <div>
                    <Typography variant="h5">Classes</Typography>
                    <ul>
                        {classes.map((classItem) => (
                            <li key={classItem.classroom_id} className='m-3 p-5 text-white-100 shadow'>
                                <Typography variant="h5">{classItem.name}</Typography>
                                <p>{classItem.description}</p>
                                <Button onClick={() => handleEnterClass(classItem)}><ArrowForwardIosIcon /></Button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='flex'>
                    <Button onClick={handleShowClasses}><ArrowBackIosIcon /></Button>
                    <div>
                        <Typography variant="h5">Manage Users In {selectedClass.name}</Typography>
                        <ul>
                            {selectedClassUsers.map(user => (
                                <li key={user.id} className='m-3 p-5 text-white-100 shadow'>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <p>Role: {user.role}</p>
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