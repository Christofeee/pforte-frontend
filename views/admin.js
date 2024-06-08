"use client"

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function AdminPage({ session }) {

    const router = useRouter();

    const handleAccountsClick = () => {
        // console.log("routing to /admin/accounts")
        router.push('/admin/accounts');
    };

    return (
        <main className="text-center p-5">
            <div className="p-5">
                <Button variant="contained" style={{ width: '100%', paddingBlock: '80px' }}>
                    Announcements
                </Button>
            </div>
            <div className="my-5" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="contained" style={{ padding: '80px' }}>Classes</Button>
                <Button
                    variant="contained"
                    style={{ padding: '80px' }}
                    onClick={handleAccountsClick}>
                    Accounts
                </Button>
            </div>
        </main>
    );
}