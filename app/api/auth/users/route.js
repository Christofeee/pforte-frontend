import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'

// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function GET() {
    try {
        console.log("IN API TO FETCH USERS")
        const accessToken = await getAccessToken();
        
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8080/admin/realms/Pforte/users';

        const response = await axios.get(url, { headers });
        console.log('Users fetch successfully', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error getting user:', error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function DELETE(req, res) {
    try {
        console.log("IN API TO DELTE USER")
        const accessToken = await getAccessToken();
        const userId = new URL(req.url).searchParams.get('id');
        console.log("USER ID", userId)
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8080/admin/realms/Pforte/users/${userId}`;

        const response = await axios.delete(url, { headers });
        console.log('User deleted successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}
