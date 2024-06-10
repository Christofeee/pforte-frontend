import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log("in get class_users API")
        const headers = {
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8000/api/classroom-users';

        const response = await axios.get(url, { headers });
        console.log('Class users fetch successfully', response.data);
        return NextResponse.json(response.data); // Return the response data as JSON
    } catch (error) {
        console.error('Error getting class users:', error);

        // Return an error response
        return new NextResponse('Error getting class users', { status: 500 });
    }
}
