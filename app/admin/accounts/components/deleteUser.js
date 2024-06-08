export default async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/auth/users?id=${userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.json();
        console.log('User delete successfully:', data);
        return data;
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        return data;
    }
}