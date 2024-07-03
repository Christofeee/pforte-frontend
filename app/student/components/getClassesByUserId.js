export default async function getClassesByUserId(userID) {
    try {
        // Fetch class-user pairs
        const classUserPairsResponse = await fetch(`/api/auth/classes/users`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const classUserPairs = await classUserPairsResponse.json();

        // Filter class IDs for the given user ID
        const classIds = classUserPairs
            .filter(item => item.user_id === userID)
            .map(item => item.classroom_id);
        // Fetch all classes
        const allClassesResponse = await fetch(`/api/auth/classes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allClasses = await allClassesResponse.json();
        // Filter all classes by the class IDs obtained
        const filteredClasses = allClasses.filter(classItem => classIds.includes(classItem.classroom_id));

        return filteredClasses;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
    }
};
