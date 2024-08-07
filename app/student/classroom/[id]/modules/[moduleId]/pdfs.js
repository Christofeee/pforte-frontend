import axios from "axios";
import React, { useEffect, useState } from "react";
import FileDropZone from "../../components/fileDropZone";
import uploadPdf from "../utils/uploadPdf";
import getPdfsById from "../utils/getPdfsById";
import DocViewer, { PDFRenderer } from "@cyntler/react-doc-viewer";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Button, Grid, Modal, Box, Typography, CircularProgress, Card, CardContent, ButtonBase, CardActions, Checkbox } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';

export default function Pdfs({ moduleId, isStudent }) {

    const [openModal, setOpenModal] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // for pdfs
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);

    // State to manage selected items
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // New state for "Select All" checkbox

    // for delte
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const [needRefetch, setNeedRefetch] = useState(false)

    useEffect(() => {
        console.log("fetching data")
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getPdfsById(moduleId);
                setPdfs(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setPdfs([]);
                setLoading(false);
            }
        };

        fetchData();
        setSelectedItems([]);
    }, [moduleId, needRefetch]);

    const handlePdfClick = async (pdf) => {
        try {
            setPdfLoading(true);
            const response = await axios.get(`http://localhost:8000/api/pdfs/download/${pdf.id}`, {
                responseType: "blob",
            });

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(pdfBlob);

            setSelectedPdf([{ uri: url, fileName: pdf.title }]);
            setPdfLoading(false);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            setPdfLoading(false);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter((itemId) => itemId !== id)
                : [...prevSelectedItems, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = pdfs.map(pdf => pdf.id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };

    const handleDeletePdf = () => {
        if (selectedItems.length > 0) {
            setShowConfirmDelete(true)
        } else {
            console.log("No pdf is selected.")
            setShowDeleteWarning(true)
        }
    }

    const deletePdf = async () => {
        console.log("DELETING: ", selectedItems)
        try {
            const url = 'http://localhost:8000/api/pdfs'
            const data = {
                ids: selectedItems
            }
            console.log("DATA: ", data)
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(url, { data, headers });
            console.log(response)
            setShowConfirmDelete(false)
            setNeedRefetch(prevState => !prevState);
        } catch (error) {
            console.error("Error Deleting PDF(s):", error);
        }
    }

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
            setNeedRefetch(prevState => !prevState);
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
            {!isStudent && (
                <div className="d-flex text-end">
                    <Button
                        // className="d-inline-block mx-5"
                        variant="contained"
                        onClick={handleSelectAll}
                        sx={{
                            textTransform: 'none',
                            padding: '.1rem', // Adjust padding for a larger button
                            borderRadius: '8px', // Rounded corners
                            backgroundColor: 'transparent', // Transparent background
                            color: '#6a5bcd', // White text color
                            '&:hover': {
                                backgroundColor: '#98fb98', // White background on hover
                                color: 'black', // Blue text color on hover
                            },
                        }}
                    >
                        <Checkbox
                            checked={selectAll}
                            size="1rem"
                            color="success"
                        />
                        <Typography sx={{ color: 'black' }} className="pr-3">
                            Select All
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => handleDeletePdf()}
                        className="mx-3"
                        size="small"
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
                        }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleOpenModal}
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
                        }}
                    >
                        <UploadFileIcon />
                    </Button>
                </div>
            )}
            <div className="p-5">
                {/* <PdfFiles moduleId={moduleId} isStudent={isStudent} /> */}
                {loading && <CircularProgress />}
                {!loading && pdfs && pdfs.length > 0 && (
                    <Grid container spacing={3}>
                        {pdfs.map((pdf, index) => (
                            <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                                {!isStudent && (
                                    <div
                                        style={{ width: "100%", height: "100%", display: "block", textDecoration: "none" }}
                                    >
                                        <Card className="pt-5 px-5" elevation={3} style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                                            <ButtonBase
                                                onClick={() => handleSelectItem(pdf.id)}
                                                style={{ flexDirection: "column" }}>
                                                <div style={{ position: "absolute", top: 0, left: 0 }}>
                                                    <Checkbox size="small" checked={selectedItems.includes(pdf.id)} color="success" />
                                                </div>
                                                <div>
                                                    <InsertDriveFileOutlinedIcon style={{ fontSize: 60, color: "#6a5bcd", alignSelf: "center" }} />
                                                </div>
                                            </ButtonBase>
                                            <Typography
                                                className="px-3"
                                                sx={{ marginTop: "10px", textAlign: "start", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 'small' }}>
                                                {pdf.title}
                                            </Typography>
                                            <div className="p-3">
                                                <Button
                                                    variant="contained"
                                                    className="rounded"
                                                    onClick={() => handlePdfClick(pdf)}
                                                    sx={{
                                                        width: '100%',
                                                        textTransform: 'none',
                                                        paddingY: 0,
                                                        paddingX: '.4rem', // Adjust padding for a larger button
                                                        borderRadius: '8px', // Rounded corners
                                                        backgroundColor: 'transparent', // Transparent background
                                                        color: '#6a5bcd', // White text color
                                                        '&:hover': {
                                                            backgroundColor: '#98fb98', // White background on hover
                                                            color: 'black', // Blue text color on hover
                                                        },
                                                    }}>
                                                    <CardActions>View</CardActions>
                                                </Button>
                                            </div>
                                        </Card>

                                    </div>
                                )}
                                {isStudent && (
                                    <ButtonBase
                                        style={{ width: "100%", height: "100%", display: "block", textDecoration: "none" }}
                                        onClick={() => handlePdfClick(pdf)}
                                    >
                                        <Card elevation={3} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <InsertDriveFileOutlinedIcon style={{ fontSize: 60, color: "#6a5bcd", alignSelf: "center" }} />
                                                <Typography variant="subtitle1" style={{ marginTop: "10px", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {pdf.title}
                                                </Typography>
                                                <Typography variant="body2" style={{ textAlign: "center" }}>
                                                    {pdf.fileName}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ButtonBase>
                                )}
                            </Grid>
                        ))}
                    </Grid>

                )}
                {pdfLoading && <CircularProgress />}
                {selectedPdf && !pdfLoading && (
                    <DocViewer
                        documents={selectedPdf}
                        pluginRenderers={[PDFRenderer]}
                        theme={{
                            primary: "#cac1ff",
                            secondary: "cyan",
                            tertiary: "#cac1ff",
                            textPrimary: "black",
                            textSecondary: "#5296d8",
                            textTertiary: "#00000099",
                            viewer: {
                                borderRadius: 10,
                            },
                            disableThemeScrollbar: false,
                        }}
                        className="p-5"
                    />
                )}
            </div>
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
                            sx={{
                                bgcolor: "#cac1ff",
                                color: "black",
                                '&:hover': {
                                    bgcolor: '#98fb98',
                                    color: 'black'
                                }
                            }}
                        >
                            Confirm Upload
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={showDeleteWarning}
                onClose={() => setShowDeleteWarning(false)}
                aria-labelledby="delete-pdf-modal-title"
                aria-describedby="delete-pdf-modal-description"
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
                    <div className="p-3">
                        <p id="delete-pdf-modal-description" className="py-2">You need to select PDF(s) to be deleted.</p>
                    </div>
                    <div className="text-end">
                        <Button variant="contained" onClick={() => setShowDeleteWarning(false)}
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
                            Close</Button>
                    </div>
                </Box>
            </Modal >
            <Modal
                open={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                aria-labelledby="delete-pdf-modal-title"
                aria-describedby="delete-pdf-modal-description"
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
                    <div className="p-3">
                        <h2 id="delete-pdf-modal-title" style={{ color: "red", fontSize: "large" }} className="py-2">Warning:</h2>
                        <p id="delete-pdf-modal-description" className="py-2">Selected PDF(s) will be deleted.</p>
                    </div>
                    <div className="text-end">
                        <Button variant="contained" onClick={() => setShowConfirmDelete(false)}
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
                        <Button variant="contained" onClick={() => deletePdf()}
                            className="mx-3"
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
                            }}>Confirm <DeleteOutlineIcon /></Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
