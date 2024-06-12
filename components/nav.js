// import Link from 'next/link';

// export default function Nav() {
//   return (
//     <ul className="mt-3">
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/">Home</Link></li>
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/products">Products</Link></li>
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/products/create">Create product</Link></li>
//     </ul>
//   );
// }
"use client";

import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CircularProgress, Backdrop } from '@mui/material';

async function keycloakSessionLogOut() {
  try {
    const response = await fetch(`/api/auth/logout`, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Logout API failed with status: ${response.status}`);
    }
    console.log("Successfully logged out from Keycloak"); // Optional logging
    signOut({ callbackUrl: "/" });
  } catch (err) {
    console.error("Error during logout:", err);
  }
}



// const pages = ['page'];
// const settings = ['Profile', 'About Us', 'Logout'];

function Nav() {

  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      signIn("keycloak");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = (key) => {
    setLoading(true);
    setAnchorElUser(null);
    const functionMap = {
      'Logout': keycloakSessionLogOut,
    };

    const functionToCall = functionMap[key];
    if (functionToCall) {
      functionToCall();
    }
  };

  function AuthStatus() {
    const { data: session, status } = useSession();

    useEffect(() => {

      if (
        status != "loading" &&
        session &&
        session?.error === "RefreshAccessTokenError"
      ) {
        signOut({ callbackUrl: "/" });
      }
    }, [session, status]);


    if (status == "loading") {
      setLoading(true)
      return <div className="my-3">Loading...</div>;
    } else if (session) {
      setLoading(false)
      return (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <div onClick={handleOpenUserMenu} style={{ padding: '', cursor: 'pointer', borderRadius: '4px', backgroundColor: '', display: 'inline-block', alignItems: 'center' }}>
              <Typography variant="body" className="text-blue-50">
                {session.user.name}
              </Typography>
              {session.roles.filter(role => ['admin', 'teacher', 'student'].includes(role)).map(role => (
                <Typography key={role} variant="body2" className="text-blue-50" align="right">
                  {role}
                </Typography>
              ))}
            </div>
          </Tooltip>
          <Menu
            sx={{ mt: '45px', position: 'fixed' }}
            id="menu-appbar"
            // anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <MenuItem key='Logout' onClick={() => handleCloseUserMenu('Logout')}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleCloseUserMenu()}>
              <Typography textAlign="center"><Link href="/about">About Us</Link></Typography>
            </MenuItem>
          </Menu>
        </Box>

      );
    }
    setLoading(false)
    return (
      <div className="my-3">
        <button style={{ backgroundColor: '#4a0080', border: 'none', boxShadow: "0px 0px .5rem black" }}
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={handleSignIn}>
          Log in
        </button>
      </div>
    );
  }

  return (
    <AppBar
      sx={{
        backgroundColor: '#6a5bcd',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
      }}>
      {loading && ( // Conditionally render loading spinner if loading state is true
        <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: '#8a2ce2' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', padding: '5px' }}>
            <AdbIcon sx={{ display: 'flex', mr: 1, color: '#' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#',
                textDecoration: 'none',
              }}
            >
              Pforte`
            </Typography>
          </div>
          <div>
            <AuthStatus />
          </div>
        </Toolbar>
      </Container>

    </AppBar>

  );
}
export default Nav;




{/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
{/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pforte`
          </Typography> */}
{/* <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box> */}