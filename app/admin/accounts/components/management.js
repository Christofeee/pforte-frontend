"use client"

import Typography from '@mui/material/Typography';
import CreateUserModal from './createUserModal';

export default function Management() {
  return (
    <main className="p-5">
      <Typography className="text-center p-5" variant="h4">Account Management</Typography>
      <div className='text-end p-5'>
        <CreateUserModal/>
      </div>
      <div className='shadow rounded p-5'>
      </div>
    </main >
  );
}

{/* <Box>
          <FormLabel><Typography variant="h6">Create User</Typography></FormLabel>
          <FormControl onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            <button type="submit">Create User</button>
          </FormControl>
        </Box>

        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email} - {user.role}
              <button onClick={() => handleEdit(user.id, { role: 'newRole' })}>
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul> */}


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Management() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     role: '',
//   });
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('/api/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error(error); // Handle error or display error message to admin
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/createUser', formData);
//       console.log(response.data); // Handle success or display message to admin
//       fetchUsers(); // Refresh user list
//     } catch (error) {
//       console.error(error); // Handle error or display error message to admin
//     }
//   };

//   const handleEdit = async (userId, updatedData) => {
//     try {
//       const response = await axios.put(`/api/users/${userId}`, updatedData);
//       console.log(response.data); // Handle success or display message to admin
//       fetchUsers(); // Refresh user list
//     } catch (error) {
//       console.error(error); // Handle error or display error message to admin
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       const response = await axios.delete(`/api/users/${userId}`);
//       console.log(response.data); // Handle success or display message to admin
//       fetchUsers(); // Refresh user list
//     } catch (error) {
//       console.error(error); // Handle error or display error message to admin
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome Admin!</h1>
//       <h2>Create User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Role</option>
//           <option value="admin">Admin</option>
//           <option value="teacher">Teacher</option>
//           <option value="student">Student</option>
//         </select>
//         <button type="submit">Create User</button>
//       </form>
//       <h2>Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username} - {user.email} - {user.role}
//             <button onClick={() => handleEdit(user.id, { role: 'newRole' })}>
//               Edit
//             </button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
