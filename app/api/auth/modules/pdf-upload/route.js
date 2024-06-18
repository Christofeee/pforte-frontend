import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing to handle multipart form data
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm();
  
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return reject(NextResponse.json({ error: 'Failed to parse form data' }, { status: 500 }));
      }

      const file = files.file;

      if (!file) {
        return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
      }

      try {
        const fileBuffer = fs.readFileSync(file.filepath);

        const formData = new FormData();
        formData.append('file', fileBuffer, file.originalFilename);

        const url = 'http://localhost:8000/api/pdf';
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return resolve(NextResponse.json(response.data, { status: 200 }));
      } catch (error) {
        console.error('Error uploading PDF to Laravel:', error);
        return reject(NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 }));
      }
    });
  });
}





// // app/api/auth/modules/pdf-upload/route.js

// import axios from 'axios';
// import { NextResponse } from 'next/server';
// import multer from 'multer';

// const upload = multer({ dest: '/tmp' });

// export async function POST(req, res) {
//     try {

//         const parsedData = await new Promise((resolve, reject) => {
//             upload.single('fileName')(req, res, (err, data) => {
//                 if (err) return reject(err);
//                 resolve(data);
//             });
//         });

//         if (parsedData.error) {
//             console.error(parsedData.error);
//             return res.status(500).json({ error: 'Failed to upload file' });
//         }

//         const file = parsedData;
//         const url = 'http://localhost:8000/api/pdf';
//         const formData = new FormData();
//         formData.append('fileName', file.buffer);

//         // Log FormData to verify it
//         console.log("FORMDATA IN POST REQ TO BACKEND: ", formData);

//         // Make Axios POST request to Laravel backend
//         const response = await axios.post(url, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });

//         // Return successful response
//         return NextResponse.json(response.data, { status: 200 });
//     } catch (error) {
//         // Handle and log any errors
//         console.error('Error uploading PDF to Laravel via Next.js:', error);
//         return NextResponse.json({ error: 'Failed to upload PDF to Laravel' }, { status: 500 });
//     }
// }
