import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../Footer';

import Topnavbar from '../Topnavbar'

import Header from '../Header';
import NovaAtracaoForm from './NovaAtracaoForm';

export default function NovaAtracaoContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <Header></Header>
          <Topnavbar></Topnavbar>
          <NovaAtracaoForm></NovaAtracaoForm>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}