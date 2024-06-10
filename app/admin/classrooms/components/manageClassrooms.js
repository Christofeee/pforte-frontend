"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';

import getClasses from './getClasses';


export default function ManageClassrooms() {
    const [classes, setClasses] = useState([]);
    const [enterClass, setEnterClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClasses();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchData();
    }, []);

    const handleEnterClass = (classItem) => {
        setSelectedClass(classItem)
        setEnterClass(true);
    };

    const handleShowClasses = () => {
        setEnterClass(false);
    };

    return (
        <div>
            {!enterClass ? (
                <div>
                    <Typography variant="h5">Classes</Typography>
                    <ul>
                        {classes.map((classItem, index) => (
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
                    <Typography variant="h5">Manage Users In {selectedClass.name}</Typography>
                </div>
            )}
        </div>
    );
}


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