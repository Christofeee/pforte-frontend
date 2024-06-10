export default async function getClassUsers() {
    try {
        console.log("in get class_users function")
        const response = await fetch(`/api/auth/classes/users`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
    }
};