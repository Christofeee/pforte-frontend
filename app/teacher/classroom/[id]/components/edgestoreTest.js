// EdgestoreTest.js

'use client';

import React, { useState } from 'react';
import { useEdgeStore } from '../../../../../lib/edgestore';
import { Button, Grid, LinearProgress, Typography } from '@mui/material';

const EdgestoreTest = () => {
  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        console.log(res);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleReplace = async (oldFileUrl) => {
    try {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: oldFileUrl,
        },
        // ...
      });
      console.log(res);
    } catch (error) {
      console.error('Error replacing file:', error);
    }
  };

  const handleDelete = async (urlToDelete) => {
    try {
      await edgestore.publicFiles.delete({
        url: urlToDelete,
      });
      console.log(`File deleted: ${urlToDelete}`);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleUploadTemporary = async () => {
    try {
      await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
      });
      console.log(`Temporary file uploaded.`);
    } catch (error) {
      console.error('Error uploading temporary file:', error);
    }
  };

  const handleConfirmUpload = async (urlToConfirm) => {
    try {
      await edgestore.publicFiles.confirmUpload({
        url: urlToConfirm,
      });
      console.log(`Temporary file confirmed: ${urlToConfirm}`);
    } catch (error) {
      console.error('Error confirming temporary file:', error);
    }
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={() => handleReplace('oldFileUrl')}>
          Replace
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="error" onClick={() => handleDelete('urlToDelete')}>
          Delete
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUploadTemporary}>
          Upload Temporary
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => handleConfirmUpload('urlToConfirm')}>
          Confirm Upload
        </Button>
      </Grid>
      {progress > 0 && (
        <Grid item xs={12}>
          <Typography variant="body2">Upload Progress: {progress}%</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Grid>
      )}
    </Grid>
  );
};

export default EdgestoreTest;
