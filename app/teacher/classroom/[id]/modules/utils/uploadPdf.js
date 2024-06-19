import axios from 'axios';

export default async function uploadPdf(file, moduleId) {
    const formData = new FormData();
    formData.append('fileName', file);
    formData.append('moduleId', moduleId);

    try {
        const response = await axios.post('http://localhost:8000/api/pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Return response data or handle success in another way if needed
        return response.data;
    } catch (error) {
        // Throw the error to be caught and handled by the component
        throw error;
    }
};







// export default async function uploadPdf(file) {
//     try {
//         const formData = new FormData();
//         formData.append('fileName', file);
//         for (const [key, value] of formData.entries()) {
//             console.log("Key:", key);
//             console.log("Value:", value);

//             // If value is a File object, you can access its properties like name and size
//             if (value instanceof File) {
//                 console.log("File Name:", value.name);
//                 console.log("File Size:", value.size);
//             }
//         }
//         const response = await fetch('/api/auth/modules/pdf-upload', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data; // Return the JSON response data
//     } catch (error) {
//         console.error('Error uploading PDF to Next.js:', error);
//         throw error; // Throw the error to be handled by the caller
//     }
// }
