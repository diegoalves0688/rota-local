import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Footer from '../Footer';

import Topnavbar from '../Topnavbar';

import Header from '../Header';
import EditarAtracaoForm from './EditarAtracaoForm';

export default function EditarAtracaoContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <Header></Header>
          <Topnavbar></Topnavbar>
          <EditarAtracaoForm></EditarAtracaoForm>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}