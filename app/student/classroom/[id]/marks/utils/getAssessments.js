import axios from "axios";

export default async function getAssessments() {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8000/api/assessments`;

        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching assessments:', error.response?.data || error.message);
    }
};