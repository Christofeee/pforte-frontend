'use client';

import React, { useState, useEffect } from 'react';
import getStudents from '../utils/getStudents';
import { Box, Typography, IconButton, Collapse, Paper, Divider, Button } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';

const RotatingIcon = styled(ArrowForwardIos)(({ theme, open }) => ({
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const StudentItem = ({ student }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Button onClick={handleToggle} elevation={1} variant='contained'
                sx={{
                    textTransform:'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width:'80vh',
                    maxWidth:'auto',
                    color:'black',
                    backgroundColor:'white'
                }}>
                <Box>
                    <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
                    <Typography variant="body2">{student.score}</Typography>
                </Box>
                <IconButton>
                    <RotatingIcon open={open} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                    <Typography variant="subtitle1">Module name</Typography>
                    <Typography variant="body2">23 / 30</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">Assessment name: 7 / 10</Typography>
                    <Typography variant="body2">Assessment name: 7 / 10</Typography>
                    <Typography variant="body2">Assessment name: 7 / 10</Typography>
                </Box>
            </Collapse>
        </Box>
    );
};

const MarkPage = ({ userId, classId }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userId);
                const studentData = await getStudents(classId);
                setStudents(studentData);
            } catch (error) {
                console.error('Error fetching Students:', error);
            }
        };
        fetchData();
    }, [classId, userId]);

    return (
        <Box>
            {students.map((student) => (
                <StudentItem key={student.id} student={student} />
            ))}
        </Box>
    );
};

export default MarkPage;
