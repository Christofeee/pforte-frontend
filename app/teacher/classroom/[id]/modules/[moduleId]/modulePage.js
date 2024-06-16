"use client"

import BackButton from "@/components/backButton";
import * as React from 'react';
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
import Pdfs from './pdfs';
import EdgestoreTest from "../../components/edgestoreTest";

export default function ModulePage({ classId, moduleId }) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('PDFs');
    const [switchChecked, setSwitchChecked] = React.useState(false);

    const pages = [
        { name: 'PDFs' },
        { name: 'Videos' },
        { name: 'Assessments' }
    ];

    const handlePageChange = (pageName) => {
        setCurrentPage(pageName)
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (pageName) => {
        setAnchorElNav(null);
    };

    const handleSwitchChange = (event) => {
        setSwitchChecked(event.target.checked);
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const editStyle = {
        marginLeft: 'auto',
        padding: '1rem',
    };

    const descriptionStyle = {
        padding: '1rem',
    };

    const renderContent = (moduleId) => {
        switch (currentPage) {
            case 'PDFs':
                // return <EdgestoreTest/>
                return <Pdfs moduleId={moduleId} />
            // return <PDFsContent />;
            case 'Videos':
                return <>videos</>
            // return <VideosContent />;
            case 'Assessments':
                return <>assessments</>
            // return <AssessmentsContent />;
            default:
                return null;
        }
    };

    return (
        <>
            <div style={containerStyle}>
                <BackButton />
                <Typography variant="h6" noWrap style={{ padding: '1rem' }}>
                    Module Name {moduleId}
                </Typography>
                <Typography variant="body" noWrap style={editStyle}>
                    Edit
                </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
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
                                    onClick={() => { handlePageChange(page.name); handleCloseNavMenu; }}
                                    sx={{
                                        width: "100%",
                                        my: 1,
                                        color: page.name === currentPage ? 'white' : "black",
                                        display: 'block',
                                        textTransform: 'none',
                                        mr: 1,
                                        backgroundColor: page.name === currentPage ? '#6a5bcd' : 'transparent',
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
                                onClick={() => { handlePageChange(page.name); handleCloseNavMenu; }}
                                sx={{
                                    my: 1,
                                    color: page.name === currentPage ? 'black' : "black",
                                    display: 'block',
                                    textTransform: 'none',
                                    mr: 1,
                                    backgroundColor: page.name === currentPage ? '#cac1ff' : 'transparent',
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
        </>
    );
}
