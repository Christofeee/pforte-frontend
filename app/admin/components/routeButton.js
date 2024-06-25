"use client"
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function RouteButton({ path, buttonName }) {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(path);
    };

    return (
        <Button
            variant="contained"
            sx={{
                color:'black',
                backgroundColor: 'white', // Main color
                padding: '25px 45px', // Initial padding
                borderRadius: '500px',
                transition: 'transform 0.5s ease,background-color 0.3s ease,color 0.5s ease', // Transition for transform change
                '&:hover': {
                    transform: 'scale(1.1)', // Larger scale on hover
                    backgroundColor: '#6a5bcd', // Hover color
                    color: 'white'
                },
            }}
            onClick={handleButtonClick}
        >
            {buttonName}
        </Button>
    );
}

