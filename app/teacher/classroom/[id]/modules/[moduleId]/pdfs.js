import { Button, Grid, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import FileDropZone from "../../components/fileDropZone";
import uploadPdf from "../utils/uploadPdf";
import PdfFiles from "./pdfFiles";

export default function Pdfs({ moduleId, isStudent }) {

    const [openModal, setOpenModal] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setErrorMessage(''); // Clear error message on modal close
    };

    const handleFileDrop = (file) => {
        setSelectedFile(file);
        setFileSelected(true);
    };

    const handleConfirmUpload = async () => {
        try {
            console.log('Confirming upload...');
            await uploadPdf(selectedFile, moduleId);
            handleCloseModal();
        } catch (error) {
            console.error('Error uploading pdf:', error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                setErrorMessage('Error: No response received from the server');
            } else {
                setErrorMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <>
            <Grid container columnSpacing={2}>
                <Grid item xs={10}>
                    <div className="p-5">
                        <PdfFiles moduleId={moduleId} isStudent={isStudent} />
                    </div>
                </Grid>
                {!isStudent && (
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button
                                size="small"
                                variant="text"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    marginBottom: '8px',
                                    bgcolor: '#cac1ff',
                                    color: 'black',
                                    '&:hover': {
                                        bgcolor: '#98fb98',
                                    }
                                }}
                            >
                                Select All
                            </Button>
                            <Button
                                size="small"
                                variant="text"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    marginBottom: '8px',
                                    bgcolor: '#ffcccc',
                                    color: 'black',
                                    '&:hover': {
                                        bgcolor: '#ff9999',
                                    }
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                size="small"
                                variant="text"
                                onClick={handleOpenModal}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    marginBottom: '8px',
                                    bgcolor: '#cac1ff',
                                    color: 'black',
                                    '&:hover': {
                                        bgcolor: '#98fb98',
                                    }
                                }}
                            >
                                Upload
                            </Button>
                        </div>
                    </Grid>
                )}

            </Grid>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',
                    }}
                >
                    <FileDropZone onFileDrop={handleFileDrop} setFileSelected={setFileSelected} />

                    {/* Error message display */}
                    {errorMessage && (
                        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleConfirmUpload}
                            disabled={!fileSelected}
                        >
                            Confirm Upload
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
