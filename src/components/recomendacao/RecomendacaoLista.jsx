import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NovaRecomendacaoForm from '../recomendacao/NovaRecomendacaoForm';
import { useCookies } from 'react-cookie'

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Typography from '@mui/material/Typography';

export default function RecomendacaoLista() {
    const [recomendacoes, setRecomentacoes] = useState([])
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [avaliacaoRecomendacao, setAvaliacaoRecomendacao] = useState()
    const [recomendacaoSelecionada, setRecomendacaoSelecionada] = useState()

    const params = useParams();
    useEffect( () => {
        if (window.location.pathname.includes('atracoes')) {
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/atracao/'+params.atracaoId).then( response => {
                setRecomentacoes(response.data)
            }).catch(response => console.log(response))
        } else if (window.location.pathname.includes('usuarios')) {
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/usuario/'+params.usuarioId).then( response => {
                setRecomentacoes(response.data)
            }).catch(response => console.log(response))
        }
    }, []);

    function handleRecomendationRate(rate, id) {
        if (cookies.user != null && cookies.token != null){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/avaliacao-recomendacao/usuario/'+cookies.user+'/recomendacao/'+id, {
                avaliacao_positiva: rate,
            }, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                alert("Avaliação salva com sucesso!")
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }        
    }
  
    return (
        <React.Fragment>
            <h3 className='recomendacoes-title'>Recomendações</h3>
            {!window.location.pathname.includes('usuarios') && 
                <NovaRecomendacaoForm></NovaRecomendacaoForm>
            }
            
            <List className='recomendacao-lista' sx={{ width: '100%', maxWidth: 1050, bgcolor: 'background.paper' }}>
                {recomendacoes.map((recomendacao) => (
                    <React.Fragment key={recomendacao.id}>
                        
                        <Stack direction="row" className='stack-thumb-recomendacao-avaliacao'>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt={recomendacao.usuario.nome} src={recomendacao.usuario.foto} />
                                </ListItemAvatar>
                                <ListItemText className='recomendacao-conteudo'
                                    primary={recomendacao.usuario.nome}
                                    secondary={
                                        <React.Fragment >
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            > {recomendacao.dataRegistro} </Typography>
                                        {recomendacao.recomendacao}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <IconButton className='recomendacao-avaliacao-icon-button' aria-label="positivo" size='large'
                                onMouseOver={() => {
                                    setAvaliacaoRecomendacao(true);
                                    setRecomendacaoSelecionada(recomendacao.id);
                                }}
                                onClick={() => {
                                    handleRecomendationRate(avaliacaoRecomendacao, recomendacaoSelecionada);
                                }}>
                                <div className='thumb-recomendacao-avaliacao'>
                                    <ThumbUpIcon className='thumb-recomendacao-avaliacao-icon'></ThumbUpIcon>
                                </div>
                            </IconButton>
                            <IconButton className='recomendacao-avaliacao-icon-button' aria-label="negativo" size='large'
                                onMouseOver={() => {
                                    setAvaliacaoRecomendacao(false);
                                    setRecomendacaoSelecionada(recomendacao.id);
                                }}
                                onClick={() => {
                                    handleRecomendationRate(avaliacaoRecomendacao, recomendacaoSelecionada);
                                }}>
                                <div className='thumb-recomendacao-avaliacao'>
                                    <ThumbDownAltIcon className='thumb-recomendacao-avaliacao-icon'></ThumbDownAltIcon>
                                </div>
                            </IconButton>
                        </Stack>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
  );
}