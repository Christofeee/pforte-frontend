import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'
// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function GET() {
    try {
        const accessToken = await getAccessToken();
        
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8080/admin/realms/Pforte/groups';

        const response = await axios.get(url, { headers });
        console.log('User created successfully:');
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching groups in auth/users/groups:', error);
        // throw error; // Re-throw the error to be caught by the calling function
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}