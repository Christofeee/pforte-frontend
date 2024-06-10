export default async function deleteClass(classId) {
    try {
        const response = await fetch(`/api/auth/classes?id=${classId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.json();
        console.log('Class delete successfully:');
        return data;
    } catch (error) {
        console.error('Error deleting class:', error.response?.data || error.message);
        return data;
    }
}