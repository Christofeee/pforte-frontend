import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import AllFileDropzone from '../../components/allFileDropZone';

const CreateAssessmentDialog = ({ open, onClose, moduleId, setNeedRefetch, classId }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [instruction, setInstruction] = useState('');
    const [marks, setMarks] = useState(''); // New state for Marks
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [links, setLinks] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileSelected, setFileSelected] = useState(false);

    const handleAddLink = () => {
        setShowLinkInput(true);
        setLinks([...links, '']);
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links];
        updatedLinks[index] = value;
        setLinks(updatedLinks);
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    const handleFileDrop = (selectedFiles) => {
        setFiles(selectedFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('due_date_time', dueDate);
        formData.append('instruction', instruction);
        formData.append('mark', marks);
        formData.append('module_id', moduleId);
        formData.append('classroom_id', classId)
        formData.append('link', links.join(',')); // Combine links into a single string
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        console.log('--- FormData entries ---');
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/assessment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Assessment created:', response.data);
            setNeedRefetch(prevState => !prevState);
            onClose();
            // setNeedRefetch(true); // Uncomment this if you handle refetching outside this component
        } catch (error) {
            console.error('Failed to create assessment:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Assessment</DialogTitle>
            <DialogContent className='p-5'>
                <form onSubmit={handleSubmit} className='p-5'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Assessment Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="datetime-local"
                                label="Due Date and Time"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Marks"
                                value={marks}
                                type="number"
                                onChange={(e) => setMarks(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Instructions"
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AllFileDropzone onFileDrop={handleFileDrop} setFileSelected={setFileSelected} />
                        </Grid>
                        {showLinkInput && (
                            <>
                                {links.map((link, index) => (
                                    <Grid item xs={12} key={index} container alignItems="center">
                                        <Grid item xs={10}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                value={link}
                                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => handleRemoveLink(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Grid item xs={12} container justifyContent="center">
                                    <IconButton size="small" onClick={handleAddLink} disabled={links.length >= 10}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </>
                        )}
                        {!showLinkInput && (
                            <Grid item xs={12} container justifyContent="center">
                                <IconButton size="small" onClick={handleAddLink}>
                                    <AddIcon /> Add Link
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose} className="ml-2">
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAssessmentDialog;
