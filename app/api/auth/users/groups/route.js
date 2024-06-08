import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'
// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function GET() {
    try {
        console.log("IN API TO FETCH GROUPS")
        const accessToken = await getAccessToken();
        
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8080/admin/realms/Pforte/groups';

        const response = await axios.get(url, { headers });
        console.log('User created successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        // throw error; // Re-throw the error to be caught by the calling function
        return NextResponse.json({ data: response.data }, { status: 500 });

    }
}

// try {
//     const results = await new Promise((resolve, reject) => {
//       db.query('SELECT * FROM department', (error, results, fields) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       });
//     });

//     return NextResponse.json({ data: results }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error}, { status: 500 });
//   }
