"use client"

import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import getClassDataById from "../modules/utils/getClassDataById";

export default function ClassName({classId}) {

    const [classData, setClassData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true before fetching data

                const classData = await getClassDataById(classId)
                setClassData(classData);

                setLoading(false); // Set loading state to false after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, []);
    
    return (
        <Typography variant='h5' textAlign={'center'}>
            {loading ? "Loading..." : classData?.name}
        </Typography>
    )
}