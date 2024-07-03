import axios from "axios";

export default async function getAssessmentsByClassId(classId) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8000/api/assessments/${classId}`;

        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching assessments:', error.response?.data || error.message);
    }
};