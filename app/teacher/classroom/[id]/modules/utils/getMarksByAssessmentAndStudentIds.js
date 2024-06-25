import axios from "axios";

export default async function getMarksByAssessmentAndStudentIds(assessment_id, studentIds) {
    try {
        const data = {
            student_ids: studentIds
        };

        const response = await axios.post(`http://localhost:8000/api/marks/assessment/${assessment_id}/students`, data);
        return response.data; // Return the data directly from response
    } catch (error) {
        throw error; // Throw the error to be handled by the caller
    }
}
