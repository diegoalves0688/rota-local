import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoginForm from './LoginForm';
import Footer from './Footer';

import Topnavbar from './Topnavbar'

import banner from '../banner.png';

export default function LoginContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <img src={banner} alt="banner" className='banner'/>
          <Topnavbar></Topnavbar>
          <LoginForm></LoginForm>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}
