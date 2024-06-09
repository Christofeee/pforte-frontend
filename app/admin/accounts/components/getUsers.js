async function getGroups() {
    try {
        const response = await fetch(`/api/auth/users/groups`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.json();
        const groups = data.data.map(group => {
            return {
                name: group.name,
                id: group.id
            };
        });
        return groups;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
    }
};

async function getGroupMembers(id) {
    try {
        const response = await fetch(`/api/auth/users/group-members?id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
    }
};

export default async function getUsers() {
    const groups = await getGroups()
    let students, teachers
    let isStudentFound = false, isTeacherFound = false
    for (const group of groups) {
        if (group.name === "students") {
            const groupMembers = await getGroupMembers(group.id)
            if (groupMembers) {
                students = groupMembers.data.map(groupMember => {
                    return {
                        id: groupMember.id,
                        username: groupMember.username,
                        firstName: groupMember.firstName,
                        lastName: groupMember.lastName,
                        email: groupMember.email,
                        role: "student"
                    };
                });
            }
            isStudentFound = true
        } else if (group.name === "teachers") {
            const groupMembers = await getGroupMembers(group.id)
            if (groupMembers) {
                teachers = groupMembers.data.map(groupMember => {
                    return {
                        id: groupMember.id,
                        username: groupMember.username,
                        firstName: groupMember.firstName,
                        lastName: groupMember.lastName,
                        email: groupMember.email,
                        role: "teacher"
                    };
                });
            }
            isTeacherFound = true
        }
        if (isStudentFound == true && isTeacherFound == true) {
            break
        }
    }
    const users = [...students, ...teachers];
    return users
}