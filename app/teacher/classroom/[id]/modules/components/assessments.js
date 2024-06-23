"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import Switch from '@mui/material/Switch';
import { ButtonBase, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadIcon from '@mui/icons-material/Download';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { Button, Typography, CircularProgress, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import getAssessmentsByModuleId from "../utils/getAssessmentsByModuleId";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import getSubmissions from "../utils/getSubmissions";
import CreateAssessmentDialog from "./createAssignmentDialog";

export default function Assessments({ moduleId, isStudent }) {

    const [loadingAssessments, setLoadingAssessments] = useState(false);
    const [assessments, setAssessments] = useState([])

    const [submissionModal, setSubmissionModal] = useState(false)
    const [isSubmissionFetching, setIsSubmissionFetching] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [needRefetch, setNeedRefetch] = useState(false)
    const [showDeleteAssessmentModal, setShowDeleteAssessmentModal] = useState(false)
    const [deleteModalForAssessment, setDeleteModalForAssessment] = useState(null);

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
    }, []);

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
            setSubmissionModal(true)
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

    const handleDeleteAssessment = async (assessmentId) => {
        // setShowDeleteAssessmentModal(true)
        // console.log("assessment Id: ", assessmentId, " is going to be deleted")
        setDeleteModalForAssessment(assessmentId);
    }

    return (
        <>
            <div className='text-end'>
                <ButtonBase
                    onClick={() => setShowCreateModal(true)}
                    className='p-3 rounded'
                    sx={{
                        textDecoration: 'none',
                        bgcolor: '#98fb98',
                        '&:hover': {
                            bgcolor: '#5EFB5E'
                        }
                    }}>
                    Create
                    <AddIcon className='ms-1' />
                </ButtonBase>
            </div>
            {loadingAssessments && <CircularProgress />}
            {!isStudent && !loadingAssessments && (
                <>
                    {assessments.map((assessment, index) => (
                        <div className="my-5 p-5 shadow rounded">
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
                                    style={editStyle}
                                    onClick={() => handleDeleteAssessment(assessment.id)}
                                    className='py-1 rounded'
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.8rem',
                                        marginBottom: '8px',
                                        bgcolor: '#ffcccc',
                                        color: 'black',
                                        '&:hover': {
                                            bgcolor: '#ff9999',
                                        }
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
                                            <div className='pt-5'>
                                                <Button
                                                    // onClick={() => setShowDeleteAssessmentModal(false)}
                                                    onClose={() => setDeleteModalForAssessment(null)}
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
                                                    }}>Confirm</Button>
                                            </div>
                                            <div className='pt-5'>
                                                <Button
                                                    // onClick={() => setShowDeleteAssessmentModal(false)}
                                                    onClose={() => setDeleteModalForAssessment(null)}
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
                                                    }}>Cancel</Button>
                                            </div>
                                        </DialogActions>
                                    </div>
                                </Dialog>
                            </div>
                            <div className="p-3">
                                <Typography variant="body" style={{ descriptionStyle, whiteSpace: 'pre-wrap' }}>
                                    {assessment.instruction.replace(/^ */, (match) => match.replace(/\s/g, '&nbsp;'))}
                                </Typography>
                            </div>

                            <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                                File(s)
                            </Typography>
                            <Grid container spacing={3}>
                                {assessment.files.map((file, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card
                                            className="mx-5"
                                            orientation="horizontal"
                                            variant="outlined"
                                            style={{ width: "100%" }}
                                        >
                                            <InsertDriveFileIcon />
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
                            <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                                Link(s)
                            </Typography>
                            <Grid container spacing={3}>
                                {assessment.link.split(",").map((link, index) => (
                                    <Grid item xs={12} sm={7} md={5} lg={3} key={index}>
                                        <Card
                                            className="mx-5"
                                            orientation="horizontal"
                                            variant="outlined"
                                            style={{ width: "100%", cursor: "pointer" }}
                                            onClick={() => window.open(link, '_blank', 'noopener,noreferrer')} // Updated onClick handler
                                        >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <LinkIcon style={{ color: "primary.main" }} />
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
                            <Grid container className="p-5 my-3">
                                <Grid item xs={8} sm={8} md={8} lg={8}>
                                    <Button
                                        onClick={() => handleSubmissionsClick(assessment.id)}
                                        className="p-5"
                                        sx={{
                                            width: '100%',
                                            bgcolor: '#cac1ff',
                                            color: 'black',
                                            '&:hover': {
                                                bgcolor: '#6a5bcd',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        Submissions and Marks
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    open submission
                                    <Switch
                                        // checked={switchChecked}
                                        // onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </>
            )}
            <Dialog
                open={submissionModal}
                onClose={() => setSubmissionModal(false)}>
                <div
                    className="p-5"
                    style={{ width: "40vw" }}>
                    <DialogTitle>Submissions</DialogTitle>
                    <DialogContent>
                        {submissions.length === 0 ? (
                            <Typography variant="body1">There are no submissions yet.</Typography>
                        ) : (submissions.map((submission, index) => (
                            <Card key={index} className="my-5" orientation="horizontal" variant="outlined" style={{ width: "100%" }}>
                                <FolderSharedIcon />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <CardContent style={{ flex: '1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <Tooltip title={`By ${submission.student_name}`}>
                                            <Typography fontWeight="md" textColor="success.plainColor">
                                                By {submission.student_name}
                                            </Typography>
                                        </Tooltip>
                                    </CardContent>
                                    <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => handleSubmissionsClick(submission.assessment_id)}>
                                        <DownloadIcon onClick={() => handleFileDownload(submission.student_id, submission.assessment_id)} />
                                    </div>
                                </div>
                            </Card>
                        )))}
                    </DialogContent>
                    <DialogActions>
                        <div className='pt-5'>
                            <Button
                                onClick={() => setSubmissionModal(false)}
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
                </div>
            </Dialog>
            <Dialog
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}>
                <div
                    className="p-5"
                    style={{ width: "40vw" }}>
                    <DialogTitle>Create Assessment</DialogTitle>
                    <DialogContent>
                        <CreateAssessmentDialog
                            open={showCreateModal}
                            onClose={() => setShowCreateModal(false)}
                            needRefetch={needRefetch}
                            setNeedRefetch={setNeedRefetch}
                            moduleId={moduleId}
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
                </div>
            </Dialog>
        </>
    );
}
