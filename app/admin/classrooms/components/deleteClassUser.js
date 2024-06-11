export default async function deleteClassUser(classUserId) {
    try {
        const response = await fetch(`/api/auth/classes/delete-member?id=${classUserId}`, {
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