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
      const isNonPdf = fileRejections.some(rejection =>
        rejection.file.type !== 'application/pdf'
      );
      if (isNonPdf) {
        setError('Only PDF files are accepted');
      }
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
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop,
    maxFiles: 1,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are accepted');
      setFileSelectedLocal(false); // No valid file selected, set state to false
    } else {
      setError(null);
      setFile(selectedFile);
      setFileSelectedLocal(true); // File selected, set state to true
      onFileDrop(selectedFile); // Pass the file up to parent component
    }
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
        <Typography>Drag & drop a PDF file here, or click to select a file</Typography>
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
            accept="application/pdf"
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








// import React from 'react';
// import { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileDropZone = ({ onDrop }) => {
//   const [droppedFile, setDroppedFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleDrop = useCallback(
//     (acceptedFiles, fileRejections) => {
//       if (fileRejections.length > 0) {
//         setErrorMessage('Only PDF files are accepted');
//       } else {
//         if (onDrop) {
//           // Since we want only one file, we take the first one from acceptedFiles array
//           onDrop(acceptedFiles[0]);
//           setDroppedFile(acceptedFiles[0]);
//           setErrorMessage('');
//         }
//       }
//     },
//     [onDrop],
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: handleDrop,
//     accept: 'application/pdf', // Accept only PDF files
//     multiple: false, // Disable multiple file selection
//   });

//   const dropzoneStyle = {
//     border: '2px dashed #ccc',
//     padding: '20px',
//     textAlign: 'center',
//     marginBottom: '20px',
//   };

//   const droppedFileStyle = {
//     display: 'flex',
//     alignItems: 'center',
//   };

//   const fileNameStyle = {
//     marginLeft: '10px',
//     fontSize: '16px',
//   };

//   const buttonStyle = {
//     backgroundColor: '#f0f0f0',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     padding: '10px 20px',
//     cursor: 'pointer',
//     marginTop: '10px', // Add margin for spacing
//   };

//   const errorMessageStyle = {
//     color: 'red',
//     fontSize: '14px',
//     marginTop: '10px',
//   };

//   return (
//     <div className="dropzone" style={dropzoneStyle} {...getRootProps()}>
//       <input {...getInputProps()} />
//       {droppedFile ? (
//         <div className="dropped-file" style={droppedFileStyle}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="36"
//             height="36"
//             viewBox="0 0 24 24"
//           >
//             <path d="M18 2H6C4.897 2 4 2.897 4 4V20c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V6l-6-4zm-4 12h-4v-2h4v2zm0-3h-4V9h4v2z" />
//           </svg>
//           <p style={fileNameStyle}>{droppedFile.name}</p>
//         </div>
//       ) : isDragActive ? (
//         <p>Drop the PDF file here ...</p>
//       ) : (
//         <div>
//           <p>Drag and drop a PDF file here, or</p>
//           <button style={buttonStyle}>Select</button>
//         </div>
//       )}
//       {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default FileDropZone;
