"use client"

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function RouteButton({ path, buttonName }) {

    const router = useRouter();

    const handleAccountsClick = () => {
        // console.log("routing to ", path)
        router.push(path);
    };

    return (
        <Button
            variant="contained"
            style={{ padding: '80px' }}
            onClick={handleAccountsClick}>
            {buttonName}
        </Button>
    );
}