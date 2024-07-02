"use client"

import * as React from 'react';
import axios from 'axios';
import BackButton from "@/components/backButton";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Pdfs from './pdfs';
import EdgestoreTest from "../../components/edgestoreTest";
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddIcon from '@mui/icons-material/Add';
import getModuleById from "../utils/getModuleById";
import { Assessment } from '@mui/icons-material';
import ModuleAssessments from '../components/assessments';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Modal, Backdrop, CircularProgress } from '@mui/material';

import { useRouter } from 'next/navigation';
import ComingSoon from '@/components/ComingSoon';

export default function ModulePage({ classId, moduleId }) {
    console.log(classId)
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('PDFs');
    const [switchChecked, setSwitchChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [moduleData, setModuleData] = React.useState(null);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const [needRefetch, setNeedRefetch] = React.useState(false);
    const [formValues, setFormValues] = React.useState({
        name: '',
        description: '',
        isComplete: false,
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true before fetching data

                const data = await getModuleById(moduleId);
                setModuleData(data);

                setLoading(false); // Set loading state to false after fetching data
                setNeedRefetch(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, [moduleId, needRefetch]);

    React.useEffect(() => {
        if (moduleData) {
            setFormValues({
                name: moduleData.name,
                description: moduleData.description,
                isComplete: moduleData.isComplete,
            });
        }
    }, [moduleData]);

    // React.useEffect(()=> {
    //     handlePageChange('Assessments')
    // })

    const pages = [
        { name: 'PDFs' },
        { name: 'Videos' },
        { name: 'Assessments' }
    ];

    const handlePageChange = (pageName) => {
        setCurrentPage(pageName);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSwitchChange = (event) => {
        setSwitchChecked(event.target.checked);
    };

    const handleEditClick = () => {
        setOpenEditModal(true);
    };

    const handleDeleteClick = () => {
        setOpenDeleteModal(true);
    }; handleDeleteClick

    const handleCloseModal = () => {
        setOpenEditModal(false);
    };

    const handleDeleteCloseModal = () => {
        setOpenDeleteModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/module/${moduleId}`, {
                ...formValues,
                classroom_id: classId
            });

            if (response.status !== 200) {
                throw new Error('Failed to update module');
            }

            setModuleData(response.data);
            handleCloseModal();
            setNeedRefetch(true)
        } catch (error) {
            console.error('Error updating module:', error);
        }
    };

    const deleteModule = async () => {
        try {
            handleDeleteCloseModal()
            setDeleting(true)
            const response = await axios.delete(`http://localhost:8000/api/module/${moduleId}`)

            if (response.status !== 200) {
                throw new Error('Failed to delete module');
            }
            router.push(`/teacher/classroom/${classId}/modules`)
        } catch (error) {
            console.error('Error deleting module:', error);
            setDeleting(false)
        }
    }

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const descriptionStyle = {
        padding: '1rem',
    };

    const renderContent = (moduleId) => {
        console.log("in rendercontent", moduleId)
        switch (currentPage) {
            case 'PDFs':
                return <Pdfs moduleId={moduleId} isStudent={switchChecked} />
            case 'Videos':
                return <ComingSoon />
            case 'Assessments':
                return <ModuleAssessments moduleId={moduleId} classId={classId} isStudent={switchChecked} />
            default:
                return null;
        }
    };

    return (
        <>
            {deleting && ( // Conditionally render loading spinner if loading state is true
                <Backdrop open={deleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: '#8a2ce2' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <div style={containerStyle}>
                <BackButton />
                <Typography variant="h6" noWrap style={{ padding: '1rem' }}>
                    {loading ? "Loading..." : moduleData?.name}
                </Typography>
                <div style={{ marginLeft: "auto" }} >
                    <Button
                        onClick={handleDeleteClick}
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            padding: '.4rem', // Adjust padding for a larger button
                            borderRadius: '8px', // Rounded corners
                            backgroundColor: 'transparent', // Transparent background
                            color: 'red', // White text color
                            '&:hover': {
                                backgroundColor: '#ffcccc', // White background on hover
                                color: 'black', // Blue text color on hover
                            },
                        }}>
                        <DeleteOutlineIcon />
                    </Button>
                    <Button
                        className='ml-3'
                        variant='contained'
                        onClick={handleEditClick}
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
                        }}>
                        <EditIcon />
                    </Button>
                </div>
            </div >
            <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                {loading ? "Loading..." : moduleData?.description}
                Description that can be long and should stay in a single line and truncate if too lengthy. Phasellus sed sapien maximus, vestibulum urna ultricies, mattis metus. Etiam pretium cursus quam sit amet hendrerit. Morbi urna enim, fermentum ut vestibulum eget, ultricies ac eros. Sed suscipit porta massa, feugiat feugiat sem feugiat eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ex ex, eleifend
            </Typography>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '0px 2px 2px -2px gray' }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => { handlePageChange(page.name); handleCloseNavMenu(); }}
                                    sx={{
                                        width: "100%",
                                        my: 1,
                                        color: page.name === currentPage ? '#6a5bcd' : "black",
                                        display: 'block',
                                        textTransform: 'none',
                                        mr: 1,
                                        boxShadow: page.name === currentPage ? '3' : '1',
                                        transition: 'background-color 0.3s ease, color 0.5s ease', // Transition for transform change
                                        '&:hover': {
                                            backgroundColor: '#98fb98',
                                            color: 'black'
                                        },
                                    }}
                                >
                                    <Typography variant="body2">
                                        {page.name}
                                    </Typography>
                                </Button>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => { handlePageChange(page.name); handleCloseNavMenu(); }}
                                sx={{
                                    my: 1,
                                    color: page.name === currentPage ? '#6a5bcd' : "black",
                                    display: 'block',
                                    textTransform: 'none',
                                    mr: 1,
                                    boxShadow: page.name === currentPage ? '3' : '1',
                                    transition: 'background-color 0.3s ease, color 0.5s ease', // Transition for transform change
                                    '&:hover': {
                                        backgroundColor: '#98fb98',
                                        color: 'black'
                                    },
                                }}
                            >
                                <Typography variant="body2">
                                    {page.name}
                                </Typography>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }} className="flex" alignItems={'center'}>
                        <Typography variant="body2" color="textSecondary">
                            Student View
                        </Typography>
                        <Switch
                            checked={switchChecked}
                            onChange={handleSwitchChange}
                            color="primary"
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <div className="p-5">
                {renderContent(moduleId)}
            </div>

            {/* Edit Module Modal */}
            <Dialog open={openEditModal} onClose={handleCloseModal}>
                <DialogTitle>Edit Module</DialogTitle>
                <DialogContent>
                    <TextField
                        className='mb-5'
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <div className='p-5'>
                        <Button
                            onClick={handleCloseModal}
                            type="submit"
                            variant="contained"
                            className="mx-3"
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
                            }}>Cancel</Button>
                        <Button
                            onClick={handleSaveChanges}
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
                            }}>Save <SaveAltIcon /></Button>

                    </div>
                </DialogActions>
            </Dialog>
            {/* Delete Confirm Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleDeleteCloseModal}
                aria-labelledby="delete-module-modal-title"
                aria-describedby="delete-module-modal-description"
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
                        <h2 id="delete-pdf-modal-title" style={{ color: "red", fontSize: "large" }} className="py-2">Warning:</h2>
                        <p id="delete-pdf-modal-description" className="py-2">This Module will be deleted.</p>
                    </div>
                    <div className="text-end">
                        <Button variant="contained" onClick={handleDeleteCloseModal}
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
                            }}>Cancel</Button>
                        <Button variant="contained"
                            onClick={() => deleteModule()}
                            className="mx-3"
                            sx={{
                                textTransform: 'none',
                                padding: '.4rem', // Adjust padding for a larger button
                                borderRadius: '8px', // Rounded corners
                                backgroundColor: 'transparent', // Transparent background
                                color: 'red', // White text color
                                '&:hover': {
                                    backgroundColor: '#ffcccc', // White background on hover
                                    color: 'black', // Blue text color on hover
                                },
                            }}>Confirm <DeleteOutlineIcon /></Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
