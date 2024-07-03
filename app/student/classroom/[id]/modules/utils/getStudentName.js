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


export default async function getStudentName(userId) {
    try {
        const privilegeToken = await getPrivilegeToken();

        const headers = {
            Authorization: `Bearer ${privilegeToken}`,
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8080/admin/realms/Pforte/users/${userId}`;

        const response = await axios.get(url, { headers });
        const studentName = response.data.firstName + response.data.lastName
        return studentName;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}