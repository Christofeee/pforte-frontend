'use client';

import React, { useState, useEffect } from 'react';
import getStudents from '../utils/getStudents';
import getModules from '../../modules/utils/getModules';
import { Box, Typography, IconButton, Collapse, Paper, Divider, Button, Grid, Avatar, Tooltip, Chip } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import getStudentMarks from '../utils/getStudentMarks';
import getAssessmentsByClassId from '../utils/getAssessmentsByClassId';

const RotatingIcon = styled(ArrowForwardIos)(({ theme, open }) => ({
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const ModuleItem = ({ module, assessments, studentMarks }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const filteredAssessments = assessments.filter(assessment => assessment.module_id === module.id);
    const totalModuleMark = filteredAssessments && filteredAssessments.map(item => item.mark).reduce((acc, current) => acc + current, 0);

    const filteredStudentMarks = studentMarks.filter(studentMark => studentMark.module_id === module.id);
    const totalStudentModuleMark = filteredStudentMarks && filteredStudentMarks.map(item => item.mark).reduce((acc, current) => acc + current, 0);

    return (
        <div className='mb-3'>
            <Button onClick={handleToggle} variant='contained'
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'white',
                    "&:hover": {
                        backgroundColor: '#cac1ff'
                    }
                }}>
                <Box>
                    <Typography variant="h6">{module.name}</Typography>
                    <Typography variant="body2" style={{ color: '#6a5bcd' }}>{totalStudentModuleMark} / {totalModuleMark}</Typography>
                </Box>
                <IconButton>
                    <RotatingIcon open={open} style={{ color: '#6a5bcd' }} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box className='p-5'>
                    {filteredAssessments.map((assessment, index) => (
                        <Grid container key={index} spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Grid item xs={6}>
                                <Typography variant="body1">{assessment.title}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" style={{ color: '#6a5bcd' }}>
                                    {(filteredStudentMarks.find(mark => mark.assessment_id === assessment.id) || { mark: 0 }).mark} / {assessment.mark}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Collapse>
        </div>
    );
};

const StudentItem = ({ student, modules, assessments, studentMarks }) => {
    const [open, setOpen] = useState(false);

    const totalClassMark = assessments && assessments.map(item => item.mark).reduce((acc, current) => acc + current, 0);
    const totalStudentMark = studentMarks && studentMarks.map(item => item.mark).reduce((acc, current) => acc + current, 0);

    const totalClassEarnedMark = (totalStudentMark / totalClassMark) * 100;
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Paper sx={{ mb: 2 }}>
            <Button onClick={handleToggle} variant='contained'
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'white',
                    px: 2,
                    py: 1,
                    "&:hover": {
                        backgroundColor: '#cac1ff'
                    }
                }}>
                <Box className="text-start">
                    <Box className="flex" sx={{ alignItems: 'center'}}>
                        <Typography variant="h6">Total Mark </Typography>
                        <Typography variant="body2"style={{ color: '#A0A0A0' }} className='ml-5'>Expand to see module and assessment marks</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#6a5bcd' }}>{totalClassEarnedMark.toFixed(2)} / 100</Typography>
                    <Typography variant="body2" style={{ color: '#A0A0A0' }}>Auto calculated from {totalStudentMark} / {totalClassMark}</Typography>
                </Box>
                <IconButton>
                    <RotatingIcon open={open} style={{ color: '#6a5bcd' }} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box className='p-5'>
                    {modules.map(module => (
                        <ModuleItem
                            key={module.id}
                            module={module}
                            assessments={assessments}
                            studentMarks={studentMarks}
                        />
                    ))}
                </Box>
            </Collapse>
        </Paper>
    );
};

const MarkPage = ({ userID, classId }) => {
    console.log("user id", userID)
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentData = await getStudents(classId);
                const filteredStudentData = studentData.find(student => userID === student.id)
                console.log("studentData", filteredStudentData)
                setStudents([filteredStudentData]);
                const moduleData = await getModules(classId);
                setModules(moduleData);
                const assessmentData = await getAssessmentsByClassId(classId)
                setAssessments(assessmentData)
                const studentMarksData = await getStudentMarks(classId)
                setStudentMarks(studentMarksData)
            } catch (error) {
                console.error('Error fetching Students and Modules:', error);
            }
        };
        fetchData();
    }, [classId, userID]);

    return (
        <Box sx={{ p: 2 }}>
            {students.map(student => (
                <StudentItem
                    key={student.id}
                    student={student}
                    modules={modules}
                    assessments={assessments}
                    studentMarks={studentMarks.filter(mark => mark.student_id === student.id)}
                />
            ))}
        </Box>
    );
};

export default MarkPage;
