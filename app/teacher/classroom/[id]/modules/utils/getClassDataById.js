import axios from "axios";

export default async function getClassDataById(classId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/classroom/${classId}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        );
        const data = response.data
        return data;
    } catch (error) {
        throw error;
    }
}