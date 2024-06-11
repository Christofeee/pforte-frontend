import axios from 'axios';
import { NextResponse } from 'next/server'

export async function POST(req, res) {
    try {
        const formData = await req.json();
        // console.log("FORM DATA: ", formData);
        const { name, description } = formData;
        // console.log("username: ", username);
        
        const headers = {
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8000/api/classrooms';

        const data = {
            name: name,
            description: description
        };

        const response = await axios.put(url, data, { headers });
        console.log('Class created successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error creating class:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}
