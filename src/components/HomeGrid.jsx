import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import ListarAtracaoCard from './ListarAtracaoCard'

export default function HomeGrid() {

  const params = useParams();
  const [hasItemsFlag, setHasItemsFlag] = useState(false)
  const [items, setItems] = useState([])
  useEffect( () => {
    if (params.termo != undefined) {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao/search?content=' + params.termo).then( response => {
        setItems(response.data)
        handleResult(response)
      }).catch(response => console.log(response))
    } else if (params.categoria != undefined) {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao?categoria=' + params.categoria).then( response => {
        setItems(response.data)
        handleResult(response)
      }).catch(response => console.log(response))
    } else {
      axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao').then( response => {
        setItems(response.data)
        handleResult(response)
      }).catch(response => console.log(response))
    }
  }, []);

  function handleResult(response){
    if (response.data.length > 0){
      setHasItemsFlag(true)
    } else {
      setHasItemsFlag(false)
    }
  }

  return (
    <div>
      <Stack sx={{ width: '70%', paddingLeft: '20%' }} spacing={2}>
          <Alert severity="info" hidden={hasItemsFlag}>
            <AlertTitle>Nenhum resultado encontrado.</AlertTitle>
            Não há nenhuma atração cadastrada com o termo pesquisado.
          </Alert>
        </Stack>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2} margin={2}>
          {
            items.map((item) => (
              <Grid xs={4} key={item.id}>
                <ListarAtracaoCard key={item.id} atracaoId={item.id} title={item.nome} description={item.descricao}
                  banner={item.imagens[0]?.urlCaminho} categoria={item.categoria} usuarioId={item.usuarioId}
                  cidade={item.localizacao.cidade} estado={item.localizacao.estado}
                  usuariofoto={item.usuario.foto} usuarionome={item.usuario.nome} data={item.dataRegistro}></ListarAtracaoCard>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  );
}