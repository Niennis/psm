'use client'
/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useSection } from "@/context/SectionContext";
import ReserveBtn from "./ReserveBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { logo } from "./imagepath";
import { useMediaQuery } from "@mui/material";
import { Tooltip, Avatar } from '@mui/material';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import { usePathname } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import { IoMdLogIn } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const pagesWithEvents = [
  { title: 'INICIO', url: '/#inicio', label: 'inicio' },
  { title: 'TEST AUTODIAGNÓSTICO?', url: '/#test_autodiagnostico', label: 'test_autodiagnostico' },
  { title: 'EVENTOS', url: '/#eventos', label: 'eventos' },
  { title: 'PREGUNTAS FRECUENTES', url: '/#preguntas_frecuentes', label: 'preguntas_frecuentes' },
  { title: 'MATERIAL DESCARGABLE', url: '/material_descargable', label: 'material_descargable' },
  { title: 'QUIÉNES SOMOS', url: '/quienes_somos', label: 'quienes_somos' },
];

const pagesWithoutEvents = [
  { title: 'INICIO', url: '/#inicio', label: 'inicio' },
  { title: 'TEST AUTODIAGNÓSTICO', url: '/#test_autodiagnostico', label: 'test_autodiagnostico' },
  { title: 'PREGUNTAS FRECUENTES', url: '/#preguntas_frecuentes', label: 'preguntas_frecuentes' },
  { title: 'MATERIAL DESCARGABLE', url: '/material_descargable', label: 'material_descargable' },
  { title: 'QUIÉNES SOMOS', url: '/quienes_somos', label: 'quienes_somos' },
];

const settings = [
  { title: 'Intervenciones', url: '/como_trabajamos', label: '/como_trabajamos' },
  { title: 'Plan de Acción', url: '/como_trabajamos/plan-de-accion-en-salud-mental', label: '/plan-de-accion-en-salud-mental' },
  { title: 'Prevención', url: '/como_trabajamos/intervencion-en-promocion-y-prevencion', label: '/intervencion-en-promocion-y-prevencion' },
  { title: 'Convenios y profesionales', url: '/como_trabajamos/convenios-y-profesionales', label: '/convenios-y-profesionales' },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { activeSection, setActiveSection } = useSection();
  const open = Boolean(anchorEl);
  const { data: session } = useSession()
  const EVENTS = 0;
  const pages = EVENTS !== 0 ? pagesWithEvents : pagesWithoutEvents
  const currentPage = usePathname()
  const divRef = useRef();
  const matches = useMediaQuery('(min-width:600px)');

  const isSmallDevice = useMediaQuery(
    "only screen and (max-width : 640px)"
  );
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 641px) and (max-width : 768px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1024px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1025px)"
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // setActiveSection(id);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <AppBar position="fixed" style={{ background: 'white', color: 'black', margin: 0, height: matches ? '112px' : '98px', justifyContent: matches ? 'center' : 'flex-end' }}>
      <Container maxWidth="false" style={{ background: 'white', color: 'black' }}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'sailec'
            }}
          >
            <img
              src={logo.src}
              width={263}
              height={70}
              alt="Logo"
            />{" "}
          </Typography>

          {/*  MENU MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {
                pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className="sailec">
                      <a href={page.url} style={{ color: 'black', fontFamily: 'sailec' }}>
                        {page.title}
                      </a>
                    </Typography>
                  </MenuItem>
                ))
              }
              <MenuItem onClick={handleOpenUserMenu}>
                <Typography textAlign="center" className="sailec">
                  <p style={{ color: 'black', fontFamily: 'sailec' }}>
                    CÓMO TRABAJAMOS <FaChevronDown />
                  </p>
                </Typography>
              </MenuItem>

              <Box sx={{ flexGrow: 0 }} className={`sailec `}>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" className="sailec">
                        <a href={setting.url} style={{ color: 'black', fontFamily: 'sailec', textDecoration: 'none' }}>
                          {setting.title}
                        </a>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: { xs: 0, lg: 2 },
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'sailec',
            }}
          >
            <img src={'https://github.com/Niennis/imagesudp/blob/main/UDP_Logo_small.png?raw=true'} width={100} alt="" />{" "}
          </Typography>

          {/* MENU DASHBOARD */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => {
              return (
                <Link style={{ color: 'black', textDecoration: 'none' }} href={page.url} key={page.title} >
                  <Button
                    className={`sailec ${activeSection === page.label
                      ? 'active-header'
                      : ''
                      }`}

                    onClick={() => handleNavClick(page.label)}
                    sx={{ fontFamily: 'sailecmedium', my: 2, color: 'black', display: 'block', width: isLargeDevice ? 'min-content' : 'fit-content' }}
                  >
                    {page.title}
                  </Button>
                </Link>
              )
            }
            )}
            <Tooltip title="Como trabajamos">
              <Button
                className={`sailec ${activeSection === 'como_trabajamos'
                  ? 'active-header'
                  : ''
                  }`}
                onClick={handleOpenUserMenu} sx={{ p: 0, m: '0 15px 0 0', fontFamily: 'sailecmedium', color: 'black' }}>
                CÓMO TRABAJAMOS
              </Button>
            </Tooltip>

            <Box sx={{ flexGrow: 0 }} className={`sailec `}>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" className="sailec">
                      <a href={setting.url} style={{ color: 'black', fontFamily: 'sailec', textDecoration: 'none' }}>
                        {setting.title}
                      </a>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open"> */}
            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
            {
              !session
                ? <>
                  <ReserveBtn text={'Reservar'} bgColor={'#FABB00'} color={'#000'} />
                  <Link href="/login#profesionales" style={{ textDecoration: 'none' }}>
                    <IoMdLogIn style={{ fontSize: matches ? '50px' : '38px', color: '#000', border: '1px solid #ff5253', borderRadius: '50px', padding: '5px', marginLeft: '5px', background: '#b82925', color: '#fff', fontFamily: 'sailec' }} />
                  </Link>
                </>
                : session.user.picture ?
                  <button className="btn">
                    <Link href="/citas" style={{ textDecoration: 'none' }}>
                      <img
                        className="avatar-img rounded-circle"
                        src={session.user.picture}
                        alt="avatar"
                        height={40}
                      />
                    </Link>
                    {/* {session.user.name} */}
                  </button>
                  :
                  <Link href="/citas">
                    <FaUserCircle style={{ height: '40px' }} />
                  </Link>
            }

            {/* </IconButton> */}
            {/* </Tooltip> */}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
