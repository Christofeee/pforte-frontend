import React from 'react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropZone = ({ onDrop }) => {
  const [droppedFile, setDroppedFile] = useState(null);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (onDrop) {
        // Since we want only one file, we take the first one from acceptedFiles array
        onDrop(acceptedFiles[0]);
        setDroppedFile(acceptedFiles[0]);
      }
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: '.pdf', // Accept only PDF files
    multiple: false, // Disable multiple file selection
  });

  const dropzoneStyle = {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const droppedFileStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const fileNameStyle = {
    marginLeft: '10px',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px', // Add margin for spacing
  };

  return (
    <div className="dropzone" style={dropzoneStyle} {...getRootProps()}>
      <input {...getInputProps()} />
      {droppedFile ? (
        <div className="dropped-file" style={droppedFileStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
          >
            <path d="M18 2H6C4.897 2 4 2.897 4 4V20c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V6l-6-4zm-4 12h-4v-2h4v2zm0-3h-4V9h4v2z" />
          </svg>
          <p style={fileNameStyle}>{droppedFile.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the PDF file here ...</p>
      ) : (
        <div>
          <p>Drag and drop a PDF file here, or</p>
          <button style={buttonStyle}>Select</button>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
