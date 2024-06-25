import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(req, res) {
    try {
        const classId = new URL(req.url).searchParams.get('id');
        const userIds = await req.json();

        const headers = {
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8000/api/classroom-users`;
        console.log("CLASS ID: ", classId)
        console.log("UserIds: ", userIds)
        const promises = userIds.map(userId => {
            const data = {
                classroom_id: classId,
                user_id: userId
            };
            return axios.put(url, data, { headers });
        });

        const responses = await Promise.all(promises);

        const responseData = responses.map(response => response.data);

        return NextResponse.json({ data: responseData }, { status: 200 });
    } catch (error) {
        console.error('Error updating class:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
