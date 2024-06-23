import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';

const AllFileDropzone = ({ onFileDrop, setFileSelected }) => {
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelectedLocal] = useState(false);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);

    if (fileRejections.length > 0) {
      const isTooManyFiles = fileRejections.some(rejection =>
        rejection.errors.some(error => error.code === 'too-many-files')
      );
      if (isTooManyFiles) {
        setError('You can only upload up to 10 files');
      }
    } else {
      const selectedFiles = [...files, ...acceptedFiles];
      setFiles(selectedFiles);
      setFileSelectedLocal(true);
      onFileDrop(selectedFiles);
    }
  }, [files, onFileDrop]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 10,
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError(null);
    setFiles(selectedFiles);
    setFileSelectedLocal(true);
    onFileDrop(selectedFiles);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#cac1ff"
      borderRadius="10px"
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
        bgcolor="#cac1ff"
        sx={{ cursor: 'pointer' }}
        width="100%"
        borderRadius="10px"
        marginBottom="20px"
      >
        <input {...getInputProps()} />
        <Typography>Drag & drop files here, or click to select files</Typography>
      </Box>
      {files.length > 0 && (
        <Typography>Selected files: {files.map(file => file.name).join(', ')}</Typography>
      )}
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
          Select Files
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            multiple
          />
        </Button>
      </Box>
      {fileSelected && setFileSelected(true)}
      {!fileSelected && setFileSelected(false)}
    </Box>
  );
};

export default AllFileDropzone;
