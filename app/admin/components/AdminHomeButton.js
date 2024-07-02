"use client"
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useRouter } from 'next/navigation';

export default function AdminHomeButton({ path }) {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.push(path)}
            variant="contained"
            sx={{
                textTransform: 'none',
                padding: '.4rem', // Adjust padding for a larger button
                borderRadius: '8px', // Rounded corners
                backgroundColor: 'transparent', // Transparent background
                color: '#6a5bcd', // White text color
                '&:hover': {
                    backgroundColor: '#98fb98', // White background on hover
                    color: 'black', // Blue text color on hover
                },
            }}
        >
            <Home />
        </Button>
    );
}
