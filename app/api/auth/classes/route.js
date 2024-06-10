import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log("in get class API")
        const headers = {
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8000/api/classrooms';

        const response = await axios.get(url, { headers });
        console.log('Classes fetch successfully', response.data);
        return NextResponse.json(response.data); // Return the response data as JSON
    } catch (error) {
        console.error('Error getting classes:', error);

        // Return an error response
        return new NextResponse('Error getting classes', { status: 500 });
    }
}
