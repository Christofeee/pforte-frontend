import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'

// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function POST(req, res) {
    try {
        const accessToken = await getAccessToken();
        const formData = await req.json();
        // console.log("FORM DATA: ", formData);
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
        console.log('User created successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}
