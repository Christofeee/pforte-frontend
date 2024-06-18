import axios from 'axios';

export default async function getModules(classId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/modules?classId=${classId}`, {
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