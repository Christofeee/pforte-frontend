import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'

// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function POST(req, res) {
    let responseData
    try {
        const accessToken = await getAccessToken();
        const formData = await req.json();
        console.log("FORM DATA: ", formData);
        const { username, email, firstName, lastName, password, role } = formData;
        // console.log("username: ", username);
        
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = 'http://localhost:8080/admin/realms/Pforte/users';

        const data = {
            enabled: true,
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            credentials: [
                {
                    type: 'password',
                    value: password,
                    temporary: false,
                },
            ],
            realmRoles: [role], // Assuming role is a string representing the desired role
            groups: [role + "s"],
        };

        const response = await axios.post(url, data, { headers });
        responseData = response.data || {}; // Handle empty response
        console.log('User created successfully:', responseData);
        return NextResponse.json({ data: responseData }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ data: responseData }, { status: 500 });
    }
}
