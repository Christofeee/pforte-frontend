import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'

export async function GET(req, res) {
    try {
        console.log("IN API TO FETCH GROUP MEMBERS")
        const accessToken = await getAccessToken();
        // const groupId = req.query.id;
        const groupId = new URL(req.url).searchParams.get('id');
        console.log("GROUP ID", groupId)
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8080/admin/realms/Pforte/groups/${groupId}/members`;

        const response = await axios.get(url, { headers });
        console.log('Group members fetched successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}