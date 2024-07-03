import axios from 'axios';

export default async function uploadSubmissionFile(file, studentId, assessmentId) {
    const formData = new FormData();
    console.log("studentId type:", typeof studentId)
    console.log("assessmentId type:", typeof studentId)
    formData.append('student_id', studentId);
    formData.append('assessment_id', assessmentId);
    formData.append('files[]', file);
    console.log("FORMDATA ", formData)

    try {
        const response = await axios.post('http://localhost:8000/api/submission-file', formData, {
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