import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HomeGrid from './HomeGrid'
import Button from '@mui/material/Button';

import Topnavbar from './Topnavbar'

import banner from '../banner.png';

export default function HomeContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <img src={banner} alt="banner" className='banner'/>
          <Topnavbar></Topnavbar>
          <div className="button-nova-atracao"><Button variant="contained" size="small" href="/nova-atracao">Nova Atração</Button></div>
          <HomeGrid></HomeGrid>
        </Box>
      </Container>
    </React.Fragment>
  );
}