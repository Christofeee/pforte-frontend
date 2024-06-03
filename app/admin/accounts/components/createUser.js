// import axios from 'axios';
// import { getAccessToken } from '@/utils/sessionTokenAccessor';

// export const createUser = async (formData) => {
//     const { username, email, firstName, lastName, password, role } = formData;

//     const accessToken = await getAccessToken();
//     const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//     };

//     const url = 'http://localhost:8080/admin/realms/Pforte/users';

//     const data = {
//         enabled: true,
//         username,
//         email,
//         firstName,
//         lastName,
//         credentials: [
//             {
//                 type: 'password',
//                 value: password,
//                 temporary: false,
//             },
//         ],
//         defaultRoles: [role], // Assuming role is a string representing the desired role
//         groups: ['students'],
//     };

//     try {
//         const response = await axios.post(url, data, { headers });
//         console.log('User created successfully:', response.data);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// };
