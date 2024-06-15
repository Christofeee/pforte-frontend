'use client'

import { Grid, Typography, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModuleList({ classId }) {

    const router = useRouter()

    const [isInstructionComplete, setIsInstructionComplete] = useState(null)
    console.log("set to: ", isInstructionComplete)
    useEffect(() => {
        setIsInstructionComplete(true)
    }, [])

    const Checkbox = ({ isChecked, handleChange }) => {
        return (
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
            />
        );
    };

    const handleCheckboxChange = () => {
        if (isInstructionComplete) {
            setIsInstructionComplete(false)

        } else {
            setIsInstructionComplete(true)
        }
    }

    const enterModule = ( classId , moduleId = 2) => {
        router.push(`/teacher/classroom/${classId}/modules/${moduleId}`)
    }

    return (
        <>
            <Grid container spacing={2} className='p-1 pb-5 mb-5' alignItems={'center'}>
                <Grid item xs={12} md={9}>
                    <div className='bg-gray-100 p-5' style={{ borderRadius: '10px', display: 'flex' }}>
                        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                            <Typography variant='h6' noWrap>
                                Full Module Name
                            </Typography>
                            <Typography variant='body2' color='textSecondary' noWrap className='p-2'>
                                Description that can be long and should stay in a single line and truncate if too lengthy. Phasellus sed sapien maximus, vestibulum urna ultricies, mattis metus. Etiam pretium cursus quam sit amet hendrerit. Morbi urna enim, fermentum ut vestibulum eget, ultricies ac eros. Sed suscipit porta massa, feugiat feugiat sem feugiat eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ex ex, eleifend
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => enterModule(classId) }
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '16px' }}>
                            <ArrowForwardIosIcon />
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className='' style={{ borderRadius: '10px' }}>
                        <Typography variant='body2' color='textSecondary' className='flex'>
                            <Checkbox isChecked={isInstructionComplete} handleChange={handleCheckboxChange} />
                            <span className='px-5'>
                                Instruction Completed
                            </span>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
