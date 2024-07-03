import axios from 'axios';

export default async function getPdfsById(moduleId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/pdfs/${moduleId}`, {
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