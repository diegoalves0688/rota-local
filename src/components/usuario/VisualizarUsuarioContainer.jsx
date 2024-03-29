import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../Footer';

import Topnavbar from '../Topnavbar'

import Header from '../Header';
import VisializarUsuarioForm from './VisualizarUsuarioForm';
import RecomendacaoLista from '../recomendacao/RecomendacaoLista';

export default function VisualizarUsuarioContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#ffffff', height: 'auto', width: 'auto' }}>
          <Header></Header>
          <Topnavbar></Topnavbar>
          <VisializarUsuarioForm></VisializarUsuarioForm>
          <RecomendacaoLista></RecomendacaoLista>
          <Footer></Footer>
        </Box>
      </Container>
    </React.Fragment>
  );
}