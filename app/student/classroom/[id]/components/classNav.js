'use client'

import * as React from 'react';
import { usePathname } from 'next/navigation'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

function ClassNav({ classId }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const currentPath = usePathname()
    console.log(currentPath)
    const pages = [
        // { name: 'Summary', path: `/teacher/classroom/${classId}/summary` },
        { name: 'Modules', path: `/student/classroom/${classId}/modules` },
        // { name: 'Assessments', path: `/teacher/classroom/${classId}/assessments` },
        // { name: 'Announcements', path: `/teacher/classroom/${classId}/announcements` },
        { name: 'Marks Dashboard', path: `/student/classroom/${classId}/marks` }
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '0px 2px 2px -2px gray' }}>
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="black"
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
                            <Link href={page.path} passHref key={page.name}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        width: '100%',
                                        my: 2,
                                        color: currentPath.includes(page.path) ? 'white' : 'black',
                                        display: 'block',
                                        textTransform: 'none',
                                        mr: 2,
                                        backgroundColor: currentPath.includes(page.path) ? '#6a5bcd' : 'transparent',
                                        transition: 'background-color 0.3s ease,color 0.5s ease', // Transition for transform change
                                        '&:hover': {
                                            backgroundColor: '#98fb98',
                                            color: 'black'
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Link href={page.path} passHref key={page.name}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: currentPath.includes(page.path) ? '#6a5bcd' : 'black',
                                    display: 'block',
                                    textTransform: 'none',
                                    mr: 2,
                                    boxShadow: currentPath.includes(page.path) ? '3' : '1',
                                    transition: 'background-color 0.3s ease,color 0.5s ease', // Transition for transform change
                                    '&:hover': {
                                        backgroundColor: '#98fb98',
                                        color: 'black'
                                    },
                                }}
                            >
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                    <Button
                        sx={{
                            marginLeft: 10,
                            my: 2,
                            color: 'black',
                            display: 'block',
                            textTransform: 'none',
                            mr: 2,
                            transition: 'background-color 0.3s ease,color 0.5s ease', // Transition for transform change
                            '&:hover': {
                                backgroundColor: '#98fb98',
                                color: 'black'
                            },
                        }}
                        disabled
                    >
                        Assessment Dashboard (Comming Soon)
                    </Button>
                    <Button
                        sx={{
                            my: 2,
                            color: 'black',
                            display: 'block',
                            textTransform: 'none',
                            mr: 2,
                            transition: 'background-color 0.3s ease,color 0.5s ease', // Transition for transform change
                            '&:hover': {
                                backgroundColor: '#98fb98',
                                color: 'black'
                            },
                        }}
                        disabled
                    >
                        Announcements (Comming Soon)
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default ClassNav;
