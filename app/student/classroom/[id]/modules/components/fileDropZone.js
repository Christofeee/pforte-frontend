import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';

const FileDropzone = ({ onFileDrop, setFileSelected }) => {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelectedLocal] = useState(false); // State to track if a file is selected

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);

    if (fileRejections.length > 0) {
      const isMultipleFiles = fileRejections.some(rejection =>
        rejection.errors.some(error => error.code === 'too-many-files')
      );
      if (isMultipleFiles) {
        setError('You can only upload one file');
      }
    } else {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileSelectedLocal(true); // File selected, set state to true
      onFileDrop(selectedFile); // Pass the file up to parent component
    }
  }, [onFileDrop]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(null);
    setFile(selectedFile);
    setFileSelectedLocal(true); // File selected, set state to true
    onFileDrop(selectedFile); // Pass the file up to parent component
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#cac1ff"  // Background color changed to #cac1ff
      borderRadius="10px" // Rounded corners
      padding="20px"
      margin="20px 0"
      width="100%"
      maxWidth="600px"
    >
      <Box
        {...getRootProps()}
        border="2px dashed black"
        padding="20px"
        textAlign="center"
        bgcolor="#cac1ff"  // Background color of the drop zone
        sx={{ cursor: 'pointer' }}
        width="100%"
        borderRadius="10px" // Rounded corners for the dropzone area
        marginBottom="20px" // Increased marginBottom for better spacing
      >
        <input {...getInputProps()} />
        <Typography>Drag & drop a file here, or click to select a file</Typography>
      </Box>
      {file && <Typography>Selected file: {file.name}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box marginTop="10px">
        <Button
          variant="contained"
          component="label"
          sx={{
            bgcolor: '#6a5bcd',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#98fb98',
              color: 'black'
            }
          }}
        >
          Select File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      {/* Pass fileSelected state up to parent component */}
      {fileSelected && setFileSelected(true)}
      {!fileSelected && setFileSelected(false)}
    </Box>
  );
};

export default FileDropzone;
