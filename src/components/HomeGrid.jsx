import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';

import ListarAtracaoCard from './ListarAtracaoCard'

export default function HomeGrid() {

  const params = useParams();
  const [items, setItems] = useState([])
  useEffect( () => {
    if (params.categoria != undefined) {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao?categoria=' + params.categoria).then( response => {
        setItems(response.data)
      }).catch(response => console.log(response))
    } else {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao').then( response => {
        setItems(response.data)
      }).catch(response => console.log(response))
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid container spacing={2} margin={2}>
        {
          items.map((item) => (
            <Grid xs={4} key={item.id}>
              <ListarAtracaoCard key={item.id} atracaoId={item.id} title={item.nome} description={item.descricao}
                banner={item.imagens[0]?.urlCaminho} categoria={item.categoria} usuarioId={item.usuarioId} location={item.localizacaoId}></ListarAtracaoCard>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}