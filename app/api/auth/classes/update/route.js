import axios from 'axios';
import { NextResponse } from 'next/server'

export async function PUT(req, res) {
    try {
        const classId = new URL(req.url).searchParams.get('id');
        console.log("CLASS ID: ", classId)
        const formData = await req.json();
        // console.log("FORM DATA: ", formData);
        const { name, description } = formData;
        // console.log("username: ", username);

        const headers = {
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8000/api/classrooms/${classId}`;

        const data = {
            enabled: true,
            // Check if the values are not null before including them in the object
            ...(name && { name }),
            ...(description && { description })
        };
        

        const response = await axios.patch(url, data, { headers });
        console.log('Class updated successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error updating class:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}
