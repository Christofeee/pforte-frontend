import React from 'react';
import { Container, Grid, Typography } from '@mui/material';



export default function Classes() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classData = await getClassesByUserId()
                setClasses(classData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Classes</div>
                <div>Search</div>
            </div>
            <div>
                
            </div>
        </div>
    );
}
