'use client'

import { useEffect, useState } from 'react';
import getClassesByUserId from "@/app/teacher/components/getClassesByUserId";

export default function MarkPage({ userId }) {

    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userId)
                const classData = await getClassesByUserId(userId)
                setClasses(classData)
            } catch (error) {
                console.error('Error fetching Classes:', error);
            }
        };
        fetchData();
    }, []);

    console.log(classes)

    return (
        <>
            {/* <div className='text-end'>
                <ButtonBase
                    onClick={() => setShowAddModuleModal(true)}
                    className='p-3 rounded'
                    sx={{
                        bgcolor: '#98fb98',
                        '&:hover': {
                            bgcolor: '#5EFB5E'
                        }
                    }}>
                    Add
                    <AddIcon className='ms-1' />
                </ButtonBase>
            </div> */}
            Mark section
        </>
    );
}
