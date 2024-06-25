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
                padding: '.6rem', // Adjust padding for a larger button
                borderRadius: '8px', // Rounded corners
                backgroundColor: 'transparent', // Transparent background
                color: 'black', // White text color
                '&:hover': {
                    backgroundColor: '#ffffff', // White background on hover
                    color: '#1976d2', // Blue text color on hover
                },
            }}
        >
            <Home />
        </Button>
    );
}
