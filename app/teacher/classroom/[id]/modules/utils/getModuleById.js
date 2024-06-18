import axios from "axios";

export default async function getModuleById(moduleId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/module/${moduleId}`, {
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