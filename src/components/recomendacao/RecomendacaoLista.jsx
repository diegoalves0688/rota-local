import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import NovaRecomendacaoForm from '../recomendacao/NovaRecomendacaoForm';

export default function RecomendacaoLista() {

    const [recomendacoes, setRecomentacoes] = useState([])
 
    const params = useParams();
    useEffect( () => {
        if (window.location.pathname.includes('atracoes')) {
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/atracao/'+params.atracaoId).then( response => {
                console.log(response.data)
                setRecomentacoes(response.data)
            }).catch(response => console.log(response))
        } else if (window.location.pathname.includes('usuarios')) {
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/usuario/'+params.usuarioId).then( response => {
                console.log(response.data)
                setRecomentacoes(response.data)
            }).catch(response => console.log(response))
        }
    }, []);
  
    return (
        <React.Fragment>
            <h3 className='recomendacoes-title'>Recomendações</h3>
            <NovaRecomendacaoForm></NovaRecomendacaoForm>
            <List className='recomendacao-lista' sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}>
                {recomendacoes.map((recomendacao) => (
                    <React.Fragment key={recomendacao.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText 
                            primary={recomendacao.usuario.nome}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                </Typography>
                                {recomendacao.recomendacao}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
  );
}