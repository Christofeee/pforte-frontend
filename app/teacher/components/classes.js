"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import getClassesByUserId from './getClassesByUserId';
import { useRouter } from 'next/navigation';

import SearchIcon from '@mui/icons-material/Search';

export default function Classes({ userID }) {
    const router = useRouter();
    const [classes, setClasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classData = await getClassesByUserId(userID);
                setClasses(classData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        // Perform search logic here, filtering classes based on searchQuery
        // For simplicity, let's assume we're filtering by class name
        return classes.filter(classItem =>
            classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleEnterClass = (classId) => {
        // Ensure classId is a string
        // const stringClassId = typeof classId === 'string' ? classId : classId.toString();
        router.push(`/teacher/classroom/${classId}/modules`);
    }

    return (
        <div>
            <div className='pb-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5'>Assigned Classes</Typography>
                <div style={{ position: 'relative' }}>
                    <Box
                        className='p-1'
                        sx={{ boxShadow: 1, borderRadius: 3 }}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by class name ..."
                            style={{
                                border: 'none',       // Remove border
                                outline: 'none',
                                padding: '8px',
                                fontSize: '12px',
                                width: '200px',
                                borderRadius: '3'
                            }}
                        />
                    </Box>
                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                        <SearchIcon style={{ color: '#6a5bcd' }} />
                    </div>
                </div>
            </div>
            <div style={{ maxHeight: '60vh', minHeight: '60vh', overflowY: 'auto', padding: '10px' }}>
                <Grid container spacing={3}>
                    {handleSearch().map((classItem) => (
                        <Grid item key={classItem.classroom_id} xs={12} sm={12} md={12}>
                            <Card className=''>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Typography fontSize='15px' textAlign="start">
                                            {classItem.name}
                                        </Typography>
                                        <Typography fontSize='13px' className="py-1" textAlign="start" color="textSecondary">
                                            {classItem.description}
                                        </Typography>
                                        {/* <Typography variant="body2" textAlign="start" className='ms-3 py-1' component="div">
                                            <ul style={{ listStyleType: 'circle' }}>
                                                <li fontSize='15px'>Start Date</li>
                                                <li fontSize='15px'>End Date</li>
                                            </ul>
                                        </Typography> */}
                                    </div>
                                    <Button
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#98fb98', // White background on hover
                                                color: 'black', // Blue text color on hover
                                            },
                                        }}
                                        onClick={() => handleEnterClass(classItem.classroom_id)}
                                    >
                                        <ArrowForwardIosIcon style={{ color: '#6a5bcd' }} />
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
