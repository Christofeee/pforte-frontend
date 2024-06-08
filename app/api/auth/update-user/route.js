import axios from 'axios';
import { getAccessToken } from '@/utils/sessionTokenAccessor';
import { NextResponse } from 'next/server'

// import { getFormData } from '@/app/admin/accounts/components/formDataStore';

export async function PUT(req, res) {
    try {
        const accessToken = await getAccessToken();
        const userId = new URL(req.url).searchParams.get('id');
        const formData = await req.json();
        // console.log("FORM DATA: ", formData);
        const { username, email, firstName, lastName, password, role } = formData;
        // console.log("username: ", username);

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const url = `http://localhost:8080/admin/realms/Pforte/users/${userId}`;

        const data = {
            enabled: true,
            // Check if the values are not null before including them in the object
            ...(username && { username }),
            ...(email && { email }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(password && {
                credentials: [
                    {
                        type: 'password',
                        value: password,
                        temporary: false,
                    },
                ],
            }),
            ...(role && { realmRoles: [role] }),
            ...(role && { groups: [role + "s"] }),
        };
        

        const response = await axios.put(url, data, { headers });
        console.log('User created successfully:', response.data);
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}
