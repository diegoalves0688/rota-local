import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HomeGrid from './HomeGrid'
import Footer from './Footer';

import Topnavbar from './Topnavbar'
import Header from './Header';

export default function HomeContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <Header></Header>
          <Topnavbar></Topnavbar>
          <HomeGrid></HomeGrid>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}