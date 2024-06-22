'use client'

import axios from "axios";
import { Grid, Typography, Box, Button, ButtonBase, Modal, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getModules from '../utils/getModules';
import AddIcon from '@mui/icons-material/Add';

export default function ModuleList({ classId }) {
    console.log("CLASS ID TYPE IS HERE: ", typeof classId)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [modules, setModules] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModuleModal, setShowAddModuleModal] = useState(false)
    const [needRefetch, setNeedRefetch] = useState(false)

    const [data, setData] = useState({
        name: '',
        description: '',
        classroom_id: parseInt(classId, 10)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true before fetching data

                const modulesData = await getModules(classId)
                setModules(modulesData);

                setLoading(false); // Set loading state to false after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, [needRefetch]);

    console.log(modules)

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

    const enterModule = (classId, moduleId) => {
        router.push(`/teacher/classroom/${classId}/modules/${moduleId}`)
    }

    const handleSearch = () => {
        // Perform search logic here, filtering classes based on searchQuery
        // For simplicity, let's assume we're filtering by class name
        return modules.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleFormChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmitModule = async (event) => {
        event.preventDefault();
        console.log(data)
        try {
            const url = 'http://localhost:8000/api/module'
            const newModuleData = {
                name: data.name,
                description: data.description,
                classroom_id: data.classroom_id
            }
            const headers = {
                'Content-Type': 'application/json',
            };
            console.log("NEW MODULE :", newModuleData)
            const response = await axios.put(url, newModuleData, { headers });
            console.log(response)
            setShowAddModuleModal(false)
            setNeedRefetch(prevState => !prevState);
        } catch (error) {
            console.error("Error Deleting PDF(s):", error);
        }
    };

    return (
        <>
            <div className='text-end'>
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
            </div>
            {handleSearch().map((module) => (
                <Grid container spacing={2} className='p-1 pb-5 mb-5' alignItems={'center'}>
                    <Grid item xs={12} md={9}>
                        <div className='bg-gray-100 p-5' style={{ borderRadius: '10px', display: 'flex' }}>
                            <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                                <Typography variant='h6' noWrap>
                                    {module.name}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' noWrap className='p-2'>
                                    {module.description} description that can be long and should stay in a single line and truncate if too lengthy. Phasellus sed sapien maximus, vestibulum urna ultricies, mattis metus. Etiam pretium cursus quam sit amet hendrerit. Morbi urna enim, fermentum ut vestibulum eget, ultricies ac eros. Sed suscipit porta massa, feugiat feugiat sem feugiat eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ex ex, eleifend
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => enterModule(classId, module.id)}
                                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '16px' }}>
                                <ArrowForwardIosIcon />
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className='' style={{ borderRadius: '10px' }}>
                            <Typography variant='body2' color='textSecondary' className='flex'>
                                <Checkbox isChecked={module.isComplete} handleChange={handleCheckboxChange} />
                                <span className='px-5'>
                                    Instruction Complete
                                </span>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            ))}
            <Modal
                open={showAddModuleModal}
                onClose={() => setShowAddModuleModal(false)}
                aria-labelledby="delete-pdf-modal-title"
                aria-describedby="delete-pdf-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',
                    }}
                >
                    <div className="p-3">
                        <h2 id="delete-pdf-modal-title" style={{ color: "", fontSize: "large" }}>Add Module</h2>
                    </div>
                    <div className="text-end">
                        <form
                            onSubmit={handleSubmitModule}
                        >
                            <TextField
                                label="Module Name"
                                name="name"
                                value={data.name}
                                onChange={handleFormChange}
                                required
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={data.description}
                                onChange={handleFormChange}
                                required
                                margin="normal"
                                fullWidth
                            />
                            <div className='pt-5'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="mx-3"
                                    sx={{
                                        bgcolor: '#98fb98',
                                        color: "black",
                                        '&:hover': {
                                            bgcolor: '#5EFB5E'
                                        }
                                    }}>Confirm <AddIcon /></Button>
                                <Button variant="contained" onClick={() => setShowAddModuleModal(false)}
                                    sx={{
                                        color: "black",
                                        bgcolor: "#cac1ff",
                                        '&:hover': {
                                            bgcolor: '#98fb98',
                                            color: 'black'
                                        }
                                    }}>Cancel</Button>
                            </div>
                        </form>

                    </div>
                </Box>
            </Modal>
        </>
    );
}
