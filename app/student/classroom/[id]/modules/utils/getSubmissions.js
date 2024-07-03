import axios from "axios";

export default async function getSubmissions(assessment_id) {
    try {
        const response = await axios.get(`http://localhost:8000/api/get-submission/${assessment_id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}
