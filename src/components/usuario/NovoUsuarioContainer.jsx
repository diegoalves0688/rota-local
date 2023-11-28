import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Topnavbar from '../Topnavbar'

import banner from '../../banner.png';
import NovoUsuarioForm from './NovoUsuarioForm';

export default function NovoUsuarioContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <img src={banner} alt="banner" className='banner'/>
          <Topnavbar></Topnavbar>
          <NovoUsuarioForm></NovoUsuarioForm>
        </Box>
      </Container>
    </React.Fragment>
  );
}