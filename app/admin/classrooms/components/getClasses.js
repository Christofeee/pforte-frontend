export default async function getClasses() {
    try {
        console.log("in get class function")
        const response = await fetch(`/api/auth/classes`, {
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