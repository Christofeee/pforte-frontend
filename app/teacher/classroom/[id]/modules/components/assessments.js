"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import Switch from '@mui/material/Switch';
import { Box, ButtonBase, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadIcon from '@mui/icons-material/Download';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { Button, Typography, CircularProgress, Grid } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import getAssessmentsByModuleId from "../utils/getAssessmentsByModuleId";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import getSubmissions from "../utils/getSubmissions";
import CreateAssessmentDialog from "./createAssignmentDialog";
import getMarksByAssessmentAndStudentIds from "../utils/getMarksByAssessmentAndStudentIds";

export default function Assessments({ moduleId, classId, isStudent }) {

    const [loadingAssessments, setLoadingAssessments] = useState(false);
    const [assessments, setAssessments] = useState([])
    const [marks, setMarks] = useState([]);
    const [formMarks, setFormMarks] = useState({});
    const [studentIds, setStudentIds] = useState([])

    const [submissionModal, setSubmissionModal] = useState(false)
    const [isSubmissionFetching, setIsSubmissionFetching] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [needRefetch, setNeedRefetch] = useState(false)
    const [showDeleteAssessmentModal, setShowDeleteAssessmentModal] = useState(false)
    const [deleteModalForAssessment, setDeleteModalForAssessment] = useState(null);
    const [isSubmissionPage, setIsSubmissionPage] = useState(true)

    useEffect(() => {
        console.log("fetching assessments")
        const fetchAssessments = async () => {
            try {
                setLoadingAssessments(true);
                const data = await getAssessmentsByModuleId(moduleId);
                setAssessments(data);
                setLoadingAssessments(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAssessments([]);
                setLoadingAssessments(false);
            }
        };
        fetchAssessments();
    }, [needRefetch]);

    useEffect(() => {
        const initialFormMarks = {};
        submissions.forEach(submission => {
            const mark = marks.find(mark => mark.student_id === submission.student_id);
            initialFormMarks[submission.student_id] = mark ? mark.mark : '';
        });
        setFormMarks(initialFormMarks);
    }, [submissions, marks]);


    console.log(assessments)

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const editStyle = {
        marginLeft: 'auto',
        cursor: 'pointer'
    };

    const descriptionStyle = {
        padding: '1rem',
    };

    function truncateFilename(fileName, maxLength) {
        if (fileName.length <= maxLength) {
            return fileName;
        }
        return fileName.slice(0, maxLength - 3) + '...'; // Truncate and add ellipsis
    }

    const handleSubmissionsClick = async (assessment_id) => {
        console.log(assessment_id)
        setIsSubmissionFetching(true)
        try {
            const data = await getSubmissions(assessment_id);
            console.log("Submissions:", data);
            setSubmissions(data)
            const studentIds = data.map(submission => submission.student_id);
            setStudentIds(studentIds)

            const markData = await getMarksByAssessmentAndStudentIds(assessment_id, studentIds)

            console.log("MARK DATA:", markData)

            setMarks(markData)
            setSubmissionModal(true)
            setIsSubmissionPage(true)
            setIsSubmissionFetching(false)
        } catch (error) {
            console.error("Error fetching or combining data:", error);
            setIsSubmissionFetching(false);
            setSubmissions([])
            setSubmissionModal(true)
        }
    }

    const handleFileDownload = async (student_id, assessment_id) => {
        try {
            const downloadUrl = 'http://localhost:8000/api/submissions/download'; // Adjust URL as per your API endpoint

            // Make a POST request to download the file
            const response = await axios.post(downloadUrl, {
                student_id: student_id,
                assessment_id: assessment_id
            }, {
                responseType: 'blob' // important for downloading blobs (files)
            });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create an anchor element
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `files_${assessment_id}_${student_id}.zip`; // Adjust filename as needed

            // Append the anchor to the body and click it to trigger the download
            document.body.appendChild(a);
            a.click();

            // Remove the anchor from the body
            document.body.removeChild(a);

            // Clean up the temporary URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
            // Handle error as needed
        }
    };

    const handleDeleteAssessment = (assessmentId) => {
        setDeleteModalForAssessment(assessmentId);
    }

    const deleteAssessment = async (assessmentId) => {
        console.log(assessmentId)
        try {
            const url = `http://localhost:8000/api/assessment/${assessmentId}`;

            const headers = {
                'Content-Type': 'application/json',
                // Add any other headers as needed (e.g., Authorization header)
            };

            const response = await axios.delete(url, { headers });

            console.log(response);

            setDeleteModalForAssessment(null);
            setNeedRefetch(prevState => !prevState);
        } catch (error) {
            console.error("Error deleting assessment:", error);
            // Handle errors appropriately (e.g., show error message to the user)
        }
    }

    const handleMarksSubmit = async (e) => {
        e.preventDefault();
        const marksData = submissions.map(submission => ({
            student_id: submission.student_id,
            student_name: submission.student_name,
            assessment_id: submission.assessment_id,
            mark: formMarks[submission.student_id],
            module_id: moduleId,
            classroom_id: classId
        }));

        console.log("marksData:")
        console.log(marksData)

        try {
            await axios.post('http://localhost:8000/api/marks/save', marksData);
            setSubmissionModal(false);
        } catch (error) {
            console.error("Error submitting marks:", error);
        }
    };

    return (
        <>
            <div className='text-end'>
                <Button
                    variant="contained"
                    onClick={() => setShowCreateModal(true)}
                    className='p-3 rounded'
                    sx={{
                        textTransform: 'none',
                        padding: '.4rem', // Adjust padding for a larger button
                        borderRadius: '8px', // Rounded corners
                        backgroundColor: 'transparent', // Transparent background
                        color: '#6a5bcd', // White text color
                        '&:hover': {
                            backgroundColor: '#98fb98', // White background on hover
                            color: 'black', // Blue text color on hover
                        },
                    }}>
                    Create Assessment +
                </Button>
            </div>
            {loadingAssessments && <CircularProgress />}
            {!isStudent && !loadingAssessments && (
                <>
                    {assessments.map((assessment, index) => (
                        <Box
                            className="my-5 p-5 rounded"
                            sx={{
                                boxShadow: 3
                            }}
                        >
                            <div style={containerStyle}>
                                <Typography variant="h6" noWrap style={{ padding: '1rem' }}>
                                    {assessment.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                                    Due {assessment.due_date_time}
                                </Typography>
                                <Typography variant="body2" color="" style={descriptionStyle}>
                                    {assessment.mark} marks
                                </Typography>
                                <Button
                                    variant="contained"
                                    style={editStyle}
                                    onClick={() => handleDeleteAssessment(assessment.id)}
                                    className='py-1 rounded'
                                    sx={{
                                        textTransform: 'none',
                                        padding: '.4rem', // Adjust padding for a larger button
                                        borderRadius: '8px', // Rounded corners
                                        backgroundColor: 'transparent', // Transparent background
                                        color: 'red', // White text color
                                        '&:hover': {
                                            backgroundColor: '#ffcccc', // White background on hover
                                            color: 'black', // Blue text color on hover
                                        },
                                    }}>
                                    <DeleteOutlineIcon />
                                </Button>
                                <Dialog
                                    // open={showDeleteAssessmentModal}
                                    // onClose={() => setShowDeleteAssessmentModal(false)}
                                    open={deleteModalForAssessment === assessment.id} // Check if this assessment's modal should be open
                                    onClose={() => setDeleteModalForAssessment(null)}
                                >
                                    <div
                                        className="p-5"
                                        style={{ width: "40vw" }}>
                                        <DialogTitle style={{ color: 'red' }}>Delete Assessment</DialogTitle>
                                        <DialogContent>
                                            Are you sure you want to delete the Assessment: <span style={{ fontSize: 'large' }}>{assessment.title}</span>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() => setDeleteModalForAssessment(null)}
                                                onClose={() => setDeleteModalForAssessment(null)}
                                                type="submit"
                                                variant="contained"
                                                className="mx-3"
                                                sx={{
                                                    textTransform: 'none',
                                                    padding: '.4rem', // Adjust padding for a larger button
                                                    borderRadius: '8px', // Rounded corners
                                                    backgroundColor: 'transparent', // Transparent background
                                                    color: '#6a5bcd', // White text color
                                                    '&:hover': {
                                                        backgroundColor: '#98fb98', // White background on hover
                                                        color: 'black', // Blue text color on hover
                                                    },
                                                }}>Cancel</Button>
                                            <Button
                                                onClick={() => deleteAssessment(assessment.id)}
                                                onClose={() => setDeleteModalForAssessment(null)}
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'none',
                                                    padding: '.4rem', // Adjust padding for a larger button
                                                    borderRadius: '8px', // Rounded corners
                                                    backgroundColor: 'transparent', // Transparent background
                                                    color: 'red', // White text color
                                                    '&:hover': {
                                                        backgroundColor: '#ffcccc', // White background on hover
                                                        color: 'black', // Blue text color on hover
                                                    },
                                                }}>Confirm<DeleteOutlineIcon /></Button>
                                        </DialogActions>
                                    </div>
                                </Dialog>
                            </div>
                            <div className="p-3">
                                <Typography variant="body" style={{ descriptionStyle, whiteSpace: 'pre-wrap' }}>
                                    {assessment.instruction.replace(/^ */, (match) => match.replace(/\s/g, '&nbsp;'))}
                                </Typography>
                            </div>
                            {assessment.files > 0 && (
                                <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                                    File(s)
                                </Typography>
                            )}
                            <Grid container spacing={3}>
                                {assessment.files.map((file, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card
                                            className="mx-5"
                                            orientation="horizontal"
                                            variant="outlined"
                                            style={{ width: "100%" }}
                                        >
                                            <InsertDriveFileIcon sx={{ color: '#6a5bcd' }} />
                                            <CardContent style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 60px)' }}>
                                                <Tooltip title={file.file_name}>
                                                    <Typography fontWeight="md" textColor="success.plainColor">
                                                        {truncateFilename(file.file_name, 30)}
                                                    </Typography>
                                                </Tooltip>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            {assessment.link && (
                                <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                                    Link(s)
                                </Typography>
                            )}
                            <Grid container spacing={3}>
                                {assessment.link && assessment.link.split(",").map((link, index) => (
                                    <Grid item xs={12} sm={7} md={5} lg={3} key={index}>
                                        <Card
                                            className="mx-5"
                                            orientation="horizontal"
                                            variant="outlined"
                                            style={{ width: "100%", cursor: "pointer" }}
                                            onClick={() => window.open(link, '_blank', 'noopener,noreferrer')} // Updated onClick handler
                                        >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <LinkIcon style={{ color: "#6a5bcd" }} />
                                                <CardContent className="mx-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 60px)' }}>
                                                    <Tooltip title={link}>
                                                        <Typography fontWeight="md" textColor="primary.main">
                                                            {truncateFilename(link, 30)}
                                                        </Typography>
                                                    </Tooltip>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid container className="p-5 my-5">
                                <Button
                                    variant="contained"
                                    onClick={() => handleSubmissionsClick(assessment.id)}
                                    className="p-5"
                                    sx={{
                                        width: '100%',
                                        textTransform: 'none',
                                        padding: '.4rem', // Adjust padding for a larger button
                                        borderRadius: '8px', // Rounded corners
                                        backgroundColor: 'transparent', // Transparent background
                                        color: 'black', // White text color
                                        '&:hover': {
                                            backgroundColor: '#98fb98', // White background on hover
                                            color: 'black', // Blue text color on hover
                                        },
                                    }}
                                >
                                    <Typography variant="h6">Submissions and Marks</Typography>
                                </Button>
                                {/* <Grid item xs={4} sm={4} md={4} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    open submission
                                    <Switch
                                        // checked={switchChecked}
                                        // onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                </Grid> */}
                            </Grid>
                        </Box>
                    ))}
                </>
            )}
            <Dialog
                open={submissionModal}
                onClose={() => setSubmissionModal(false)}>
                <div
                    className="p-5"
                    style={{ width: "40vw" }}>
                    <div className="flex">
                        <Button
                            onClick={() => setIsSubmissionPage(true)}
                            className="mr-3"
                            sx={{
                                textTransform: 'none',
                                color: isSubmissionPage === true ? '#6a5bcd' : 'black',
                                boxShadow: isSubmissionPage === true ? '3' : '1',
                                '&:hover': {
                                    bgcolor: '#6a5bcd',
                                    color: 'white'
                                }
                            }}
                        >Submissions</Button>
                        <Button
                            onClick={() => setIsSubmissionPage(false)}
                            className="mr-3"
                            sx={{
                                textTransform: 'none',
                                color: isSubmissionPage === false ? '#6a5bcd' : 'black',
                                boxShadow: isSubmissionPage === false ? '3' : '1',
                                '&:hover': {
                                    bgcolor: '#6a5bcd',
                                    color: 'white'
                                }
                            }}
                        >Marks</Button>
                    </div>
                    {isSubmissionPage && (
                        <DialogContent>
                            {submissions.length === 0 ? (
                                <Typography variant="body1">There are no submissions yet.</Typography>
                            ) : (submissions.map((submission, index) => (
                                <Card key={index} className="my-5" orientation="horizontal" variant="outlined" style={{ width: "100%" }}>
                                    <FolderSharedIcon sx={{ color: '#6a5bcd' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <CardContent style={{ flex: '1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <Tooltip title={`By ${submission.student_name}`}>
                                                <Typography fontWeight="md" textColor="success.plainColor">
                                                    By {submission.student_name}
                                                </Typography>
                                            </Tooltip>
                                        </CardContent>
                                        <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => handleSubmissionsClick(submission.assessment_id)}>
                                            <DownloadIcon
                                                sx={{ color: "#6a5bcd" }}
                                                onClick={() => handleFileDownload(submission.student_id, submission.assessment_id)}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            )))}
                            <DialogActions>
                                <div className='pt-5'>
                                    <Button
                                        onClick={() => setSubmissionModal(false)}
                                        type="submit"
                                        variant="contained"
                                        className="px-5"
                                        sx={{
                                            textTransform: 'none',
                                            padding: '.4rem', // Adjust padding for a larger button
                                            borderRadius: '8px', // Rounded corners
                                            backgroundColor: 'transparent', // Transparent background
                                            color: '#6a5bcd', // White text color
                                            '&:hover': {
                                                backgroundColor: '#98fb98', // White background on hover
                                                color: 'black', // Blue text color on hover
                                            },
                                        }}>back</Button>
                                </div>
                            </DialogActions>
                        </DialogContent>
                    )}
                    {!isSubmissionPage && (
                        <DialogContent>
                            {submissions.length === 0 ? (
                                <Typography variant="body1">There are no marks available yet.</Typography>
                            ) : (
                                <form
                                    className=""
                                    onSubmit={handleMarksSubmit}
                                >
                                    {submissions.map((submission, index) => {
                                        const mark = marks.find(mark => mark.student_id === submission.student_id);
                                        return (
                                            <TextField
                                                className="block my-5"
                                                key={index}
                                                label={`Mark for ${submission.student_name}`}
                                                value={formMarks[submission.student_id] ?? (mark ? mark.mark : '')}
                                                type="number"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormMarks({
                                                        ...formMarks,
                                                        [submission.student_id]: value === '' ? '' : Number(value)
                                                    });
                                                }}
                                                required
                                            />
                                        )
                                    })}
                                    <DialogActions>
                                        <Button
                                            variant="contained"
                                            onClick={() => setSubmissionModal(false)}
                                            sx={{
                                                textTransform: 'none',
                                                padding: '.4rem', // Adjust padding for a larger button
                                                borderRadius: '8px', // Rounded corners
                                                backgroundColor: 'transparent', // Transparent background
                                                color: '#6a5bcd', // White text color
                                                '&:hover': {
                                                    backgroundColor: '#98fb98', // White background on hover
                                                    color: 'black', // Blue text color on hover
                                                },
                                            }}>back</Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                textTransform: 'none',
                                                padding: '.4rem', // Adjust padding for a larger button
                                                borderRadius: '8px', // Rounded corners
                                                backgroundColor: 'transparent', // Transparent background
                                                color: '#6a5bcd', // White text color
                                                '&:hover': {
                                                    backgroundColor: '#98fb98', // White background on hover
                                                    color: 'black', // Blue text color on hover
                                                },
                                            }}>
                                            Save <SaveAltIcon />
                                        </Button>
                                    </DialogActions>
                                </form>
                            )}
                        </DialogContent>
                    )}
                </div>
            </Dialog>
            <Dialog
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}>
                <DialogContent>
                    <CreateAssessmentDialog
                        open={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        needRefetch={needRefetch}
                        setNeedRefetch={setNeedRefetch}
                        moduleId={moduleId}
                        classId={classId}
                    />
                </DialogContent>
                <DialogActions>
                    <div className='pt-5'>
                        <Button
                            onClick={() => setShowCreateModal(false)}
                            type="submit"
                            variant="contained"
                            className="mx-3"
                            sx={{
                                color: "black",
                                bgcolor: "#98fb98",
                                '&:hover': {
                                    bgcolor: '#32cd32',
                                    color: 'black'
                                }
                            }}>Create</Button>
                    </div>
                    <div className='pt-5'>
                        <Button
                            onClick={() => setShowCreateModal(false)}
                            type="submit"
                            variant="contained"
                            className="mx-3"
                            sx={{
                                color: "black",
                                bgcolor: "#cac1ff",
                                '&:hover': {
                                    bgcolor: '#98fb98',
                                    color: 'black'
                                }
                            }}>back</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}
