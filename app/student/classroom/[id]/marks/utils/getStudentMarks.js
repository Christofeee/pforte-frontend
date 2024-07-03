import axios from "axios";

export default async function getStudentMarks(classId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/marks/classroom/${classId}`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching classusers:', error)
    }
}