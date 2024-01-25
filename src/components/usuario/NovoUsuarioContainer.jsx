import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../Footer';

import Topnavbar from '../Topnavbar'
import Header from '../Header';
import NovoUsuarioForm from './NovoUsuarioForm';

export default function NovoUsuarioContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <Header></Header>
          <Topnavbar></Topnavbar>
          <NovoUsuarioForm></NovoUsuarioForm>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}