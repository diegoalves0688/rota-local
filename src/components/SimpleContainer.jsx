import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BasicGrid from '../components/BasicGrid'

import Topnavbar from '../components/Topnavbar'

import banner from '../banner.png';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <img src={banner} alt="banner" className='banner'/>
          <Topnavbar></Topnavbar>
          <BasicGrid></BasicGrid>
        </Box>
      </Container>
    </React.Fragment>
  );
}