import { Button, Grid, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import FileDropZone from "../../components/fileDropZone";

export default function Pdfs({ moduleId }) {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleFileDrop = (file) => {
        // Handle the dropped file here
        console.log('File dropped:', file);
    };

    return (
        <>
            <Grid container columnSpacing={2}>
                <Grid item xs={10}>
                    <div className="bg-gray-100">
                        PDFS {moduleId}
                    </div>
                </Grid>
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
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <FileDropZone onDrop={handleFileDrop} />
                </Box>
            </Modal>
        </>
    );
}
