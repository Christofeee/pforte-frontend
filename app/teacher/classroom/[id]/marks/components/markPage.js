'use client';

import React, { useState, useEffect } from 'react';
import getStudents from '../utils/getStudents';
import getModules from '../../modules/utils/getModules';
import { Box, Typography, IconButton, Collapse, Paper, Divider, Button } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import getAssessments from '../utils/getAssessments';
import getStudentMarks from '../utils/getStudentMarks';

const RotatingIcon = styled(ArrowForwardIos)(({ theme, open }) => ({
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

function markOperation(earnedMark, totalMark) {

}

const ModuleItem = ({ module, assessments, studentMarks }) => {
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

const StudentItem = ({ student, modules, assessments, studentMarks }) => {
    const [open, setOpen] = useState(false);

    const totalClassMark = assessments && assessments.map(item => item.mark).reduce((acc, current) => acc + current, 0);

    console.log("Class total mark :", totalClassMark)
    const handleToggle = () => {
        setOpen(!open);
    };
    console.log("Mark IN StudentITEM", studentMarks)
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
                <Box className="text-start">
                    <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
                    <Typography variant="body">mark / 100</Typography>
                </Box>
                <IconButton>
                    <RotatingIcon open={open} />
                </IconButton>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
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
        </Box>
    );
};

const MarkPage = ({ userId, classId }) => {
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentData = await getStudents(classId);
                setStudents(studentData);
                const moduleData = await getModules(classId);
                setModules(moduleData);
                const assessmentData = await getAssessments()
                setAssessments(assessmentData)
                const studentMarksData = await getStudentMarks(classId)
                setStudentMarks(studentMarksData)
            } catch (error) {
                console.error('Error fetching Students and Modules:', error);
            }
        };
        fetchData();
    }, [classId, userId]);
    console.log("Student marks", studentMarks)
    return (
        <Box>
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
