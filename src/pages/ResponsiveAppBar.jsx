import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import imgPicapau from '../assets/iconNameEPicaPau.png';
import { useNavigate } from 'react-router-dom';
import { UserStatus } from '../components/UserStatus';
import { jwtDecode } from 'jwt-decode';

const pagesRegular = ['Triagem', 'Histórico de Processos', 'Envolvidos', 'Cobrança'];
const pagesAdmin = ['Triagem', 'Histórico de Processos', 'Envolvidos', 'Cobrança', 'Advogados'];
const settings = ['Logout'];

export const  ResponsiveAppBar = ()=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showAdvogado, setShowAdvogado] = React.useState(false);
  const navigate = useNavigate();

  // VERIFICAR ROLE
  let pages = [];

  React.useEffect(() => {
    const userRole = jwtDecode(localStorage.getItem("token")).role;
    if(userRole === 2){
      setShowAdvogado(true);
    }
  verificarLogin();
  return () => verificarLogin()
}, []);

  const verificarLogin = async () => {

    if(localStorage.getItem("sapiensCPF") == null || localStorage.getItem("sapiensSenha") == null || localStorage.getItem("token") == null){
      navigate("/");
    }
  }

  {showAdvogado ? (
    pages = pagesAdmin
  ) : (
    pages = pagesRegular
  )}

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    if(value.trim() == "Triagem"){
      navigate("/triagem");
    }else if(value.trim() === "Histórico de Processos"){
      navigate("/historico");
    }else if(value.trim() === "Envolvidos"){
      navigate("/envolvidos");
    } else if (value.trim() === "Cobrança") {
      navigate("/cobranca");
    } else if (value.trim() === "Advogados") {
      navigate("/advogados")
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (value) => {
    if(value.trim()=="Logout"){
      localStorage.clear()
      navigate("/");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          
          <img className='imagemPicapau' src={imgPicapau} alt="" />
            
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: '#111', display: 'block', marginLeft: '35px' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {<UserStatus/>}
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
                <MenuItem key={setting} onClick={()=> handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;