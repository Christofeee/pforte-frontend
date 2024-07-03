import axios from "axios";

export default async function getAssessmentsByModuleId(moduleId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/assessment/${moduleId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}
