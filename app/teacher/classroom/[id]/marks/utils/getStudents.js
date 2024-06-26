import axios from "axios";

async function getPrivilegeToken() {
    try {
        const url = 'http://localhost:8080/realms/Pforte/protocol/openid-connect/token'
        const response = await axios.post(url, new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'pforte-frontend',
            client_secret: 'sfTX0yBZIrxeNCDBx8w1FUkSHIh7Vfva'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token
    } catch (error) {
        console.log(error)
    }
}

async function getGroups(accessToken) {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8080/admin/realms/Pforte/groups';

        const response = await axios.get(url, { headers });
        const groups = response.data.map(group => {
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

async function getGroupMembers(accessToken, groupId) {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8080/admin/realms/Pforte/groups/${groupId}/members`;

        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error group members:', error.response?.data || error.message);
    }
};

async function getClassUsers(classId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/classroom-users/${classId}`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching classusers:', error)
    }
}

// export default async function getUsers() {
//     const groups = await getGroups()
//     let students, teachers
//     let isStudentFound = false, isTeacherFound = false
//     for (const group of groups) {
//         if (group.name === "students") {
//             const groupMembers = await getGroupMembers(group.id)
//             if (groupMembers) {
//                 students = groupMembers.data.map(groupMember => {
//                     return {
//                         id: groupMember.id,
//                         username: groupMember.username,
//                         firstName: groupMember.firstName,
//                         lastName: groupMember.lastName,
//                         email: groupMember.email,
//                         role: "student"
//                     };
//                 });
//             }
//             isStudentFound = true
//         } else if (group.name === "teachers") {
//             const groupMembers = await getGroupMembers(group.id)
//             if (groupMembers) {
//                 teachers = groupMembers.data.map(groupMember => {
//                     return {
//                         id: groupMember.id,
//                         username: groupMember.username,
//                         firstName: groupMember.firstName,
//                         lastName: groupMember.lastName,
//                         email: groupMember.email,
//                         role: "teacher"
//                     };
//                 });
//             }
//             isTeacherFound = true
//         }
//         if (isStudentFound == true && isTeacherFound == true) {
//             break
//         }
//     }
//     const users = [...students, ...teachers];
//     return users
// }

export default async function getStudents(classId) {
    try {
        const privilegeToken = await getPrivilegeToken();
        const groups = await getGroups(privilegeToken)
        let students
        const classUsers = await getClassUsers(classId)
        for (const group of groups) {
            if (group.name === "students") {
                const groupMembers = await getGroupMembers(privilegeToken, group.id)
                console.log("GROUPMemeberS:", groupMembers)
                if (groupMembers) {
                    students = groupMembers.map(groupMember => {
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
            }
        }
        const filteredClassUsers = classUsers.filter(classUser =>
            students.some(student => student.id === classUser.user_id)
        );

        console.log("filteredClassUsers", filteredClassUsers)
        return students
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}