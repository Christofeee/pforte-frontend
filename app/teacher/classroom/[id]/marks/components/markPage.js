'use client';

import React, { useState, useEffect } from 'react';
import getStudents from '../utils/getStudents';
import getModules from '../../modules/utils/getModules';
import { Box, Typography, IconButton, Collapse, Button } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import getAssessmentsByClassId from '../utils/getAssessmentsByClassId';
import getStudentMarks from '../utils/getStudentMarks';

const RotatingIcon = styled(ArrowForwardIos)(({ open }) => ({
    transition: 'transform 0.3s ease-in-out',
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
}));

const MarkPage = ({ userId, classId }) => {
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
    const [openStudentToggles, setOpenStudentToggles] = useState({});
    const [openModuleToggles, setOpenModuleToggles] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentData, moduleData, assessmentData, studentMarksData] = await Promise.all([
                    getStudents(classId),
                    getModules(classId),
                    getAssessmentsByClassId(classId),
                    getStudentMarks(classId)
                ]);
                setStudents(studentData);
                setModules(moduleData);
                setAssessments(assessmentData);
                setStudentMarks(studentMarksData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classId, userId]);

    const toggleStudentOpen = (studentId) => {
        setOpenStudentToggles(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const toggleModuleOpen = (studentId, moduleId) => {
        setOpenModuleToggles(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [moduleId]: {
                    ...prev[studentId]?.[moduleId],
                    isOpen: !prev[studentId]?.[moduleId]?.isOpen
                }
            }
        }));
    };

    const toggleAssessments = (studentId, moduleId) => {
        setOpenModuleToggles(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [moduleId]: {
                    ...prev[studentId]?.[moduleId],
                    openAssessments: !prev[studentId]?.[moduleId]?.openAssessments
                }
            }
        }));
    };

    const closeAllToggles = () => {
        setOpenStudentToggles({});
        setOpenModuleToggles({});
    };

    const classTotalMark = assessments.reduce((acc, assessment) => acc + assessment.mark, 0);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
                <Button variant='contained' color='secondary' onClick={closeAllToggles}>
                    Close All
                </Button>
            </Box>
            {students.map(student => (
                <Box key={student.id}>
                    <Button onClick={() => toggleStudentOpen(student.id)} variant='contained' sx={{ textTransform: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80vw', color: 'black', backgroundColor: 'white', my: 1 }}>
                        <Box className="text-start">
                            <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
                            <Typography variant="body">
                                <span>{((studentMarks.filter(mark => mark.student_id === student.id).reduce((acc, mark) => acc + mark.mark, 0)) / classTotalMark * 100).toFixed(2)} / 100</span>
                                <span className='ms-5' style={{ color: 'GrayText' }}>Auto calculated from {studentMarks.filter(mark => mark.student_id === student.id).reduce((acc, mark) => acc + mark.mark, 0)} / {classTotalMark}</span>
                            </Typography>
                        </Box>
                        <IconButton>
                            <RotatingIcon open={openStudentToggles[student.id] || false} />
                        </IconButton>
                    </Button>
                    <Collapse in={openStudentToggles[student.id] || false} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                            {modules.map(module => (
                                <Box key={module.id}>
                                    <Button onClick={() => toggleModuleOpen(student.id, module.id)} variant='contained' sx={{ textTransform: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75vw', color: 'black', backgroundColor: 'white', ml: 4, my: 1 }}>
                                        <Box className="text-start">
                                            <Typography variant="h6">{module.name}</Typography>
                                            <Typography variant="body">
                                                {((studentMarks.filter(mark => mark.module_id === module.id).reduce((acc, mark) => acc + mark.mark, 0)) / assessments.filter(assessment => assessment.module_id === module.id).reduce((acc, assessment) => acc + assessment.mark, 0)).toFixed(2)} / 100
                                            </Typography>
                                        </Box>
                                        <IconButton>
                                            <RotatingIcon open={openModuleToggles[student.id]?.[module.id]?.isOpen || false} />
                                        </IconButton>
                                    </Button>
                                    <Collapse in={openModuleToggles[student.id]?.[module.id]?.isOpen || false} timeout="auto" unmountOnExit>
                                        <Box sx={{ pl: 6, pr: 2, py: 1, width: '75vw' }} className="text-start">
                                            {assessments.filter(assessment => assessment.module_id === module.id).map((assessment, index) => {
                                                const earnedMark = (studentMarks.find(mark => mark.assessment_id === assessment.id) || { mark: 0 }).mark;
                                                return (
                                                    <Box key={index} className='flex m-3 p-3 rounded' style={{ backgroundColor: '#cac1ff' }}>
                                                        <Typography variant="body" style={{ fontWeight: 'bold' }}>{assessment.title}</Typography>
                                                        <Typography variant="body" className='pl-5 ml-5'>{earnedMark} / {assessment.mark}</Typography>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    </Collapse>
                                </Box>
                            ))}
                        </Box>
                    </Collapse>
                </Box>
            ))}
        </Box>
    );
};

export default MarkPage;
