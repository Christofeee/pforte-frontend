'use client';

import React, { useState, useEffect } from 'react';
import getStudents from '../utils/getStudents';
import getModules from '../../modules/utils/getModules';
import { Box, Typography, IconButton, Collapse, Paper, Divider, Button } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import getAssessments from '../utils/getAssessments';

const RotatingIcon = styled(ArrowForwardIos)(({ theme, open }) => ({
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const ModuleItem = ({ module, assessments }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const filteredAssessments = assessments.filter(assessment => assessment.module_id === module.id);

    return (
        <Box>
            <Button onClick={handleToggle} elevation={1} variant='contained'
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '75vw',
                    maxWidth: 'auto',
                    color: 'black',
                    backgroundColor: 'white',
                    ml: 4, // Add some left margin to indent module items
                    my: 1
                }}>
                <Box>
                    <Typography variant="h6">{module.name}</Typography>
                    {/* <Typography variant="body2">{module.score} / 30</Typography> */}
                </Box>
                <IconButton>
                    <RotatingIcon open={open} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                    <Typography variant="subtitle1">Assessments</Typography>
                    {filteredAssessments.map((assessment, index) => (
                        <Typography key={index} variant="body2">{assessment.title}</Typography>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

const StudentItem = ({ student, modules, assessments }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Button onClick={handleToggle} elevation={1} variant='contained'
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '80vw',
                    color: 'black',
                    backgroundColor: 'white',
                    my: 1
                }}>
                <Box>
                    <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
                </Box>
                <IconButton>
                    <RotatingIcon open={open} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                    {modules.map(module => (
                        <ModuleItem key={module.id} module={module} assessments={assessments} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

const MarkPage = ({ userId, classId }) => {
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentData = await getStudents(classId);
                setStudents(studentData);
                const moduleData = await getModules(classId);
                setModules(moduleData);
                const assessmentData = await getAssessments()
                setAssessments(assessmentData)
            } catch (error) {
                console.error('Error fetching Students and Modules:', error);
            }
        };
        fetchData();
    }, [classId, userId]);
    console.log("ASSESSMENTS", assessments)
    return (
        <Box>
            {students.map(student => (
                <StudentItem key={student.id} student={student} modules={modules} assessments={assessments} />
            ))}
        </Box>
    );
};

export default MarkPage;
