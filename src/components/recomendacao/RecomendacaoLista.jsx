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

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link } from "react-router-dom";

export default function RecomendacaoLista() {
    const [open, setOpen] = useState(false)
    const handleLoginDialogOpen = () => {
        setOpen(true);
    };
    const handleLoginDialogClose = () => {
        setOpen(false);
    };
    const handleDialogConfirm = () => {
        setOpen(false);
        navigate("/login")
    };

    const [rateOpen, setRateOpen] = useState(false)
    const handleRateDialogOpen = () => {
        setRateOpen(true);
    };
    const handleRateDialogClose = () => {
        setRateOpen(false);
        window.location.reload(false);
    };

    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDeleteDialogOpen = () => {
        setDeleteOpen(true);
    };
    const handleDeleteDialogClose = () => {
        setDeleteOpen(false);
    };
    const handleDeleteDialogConfirm = () => {
        setDeleteOpen(false);
        window.location.reload(false);
    };

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

    function isLogged(){
        return cookies.user != "undefined" && cookies.user != null
    }

    function handleRecomendationRate(rate, id) {
        if (isLogged()){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/avaliacao-recomendacao/usuario/'+cookies.user+'/recomendacao/'+id, {
                avaliacao_positiva: rate,
            }, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                handleRateDialogOpen();
            });
        } else {
            handleLoginDialogOpen()
        }        
    }

    function handleDeleteRecomendacao() {
        if (isLogged()){
            axios.delete(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/'+recomendacaoSelecionada, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                handleDeleteDialogOpen();
            });
        } else {
            handleLoginDialogOpen()
        }        
    }
  
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleLoginDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Usuário não logado!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Deseja ser redirecionado para a página de login?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleLoginDialogClose}>Desistir</Button>
                <Button onClick={handleDialogConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={rateOpen}
                onClose={handleRateDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Sucesso!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Sua avaliação foi salva e já está disponível
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleRateDialogClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Aviso!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Deseja realmente deletar a recomendação?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteDialogClose}>Desistir</Button>
                <Button onClick={handleDeleteDialogConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <h3 className='recomendacoes-title'>Recomendações</h3>
            {!window.location.pathname.includes('usuarios') && 
                <NovaRecomendacaoForm></NovaRecomendacaoForm>
            }
            
            <List className='recomendacao-lista' sx={{ width: '100%', maxWidth: 1050, bgcolor: 'background.paper' }}>
                {recomendacoes.map((recomendacao) => (
                    <React.Fragment key={recomendacao.id}>
                        
                        <Stack direction="row" className='stack-thumb-recomendacao-avaliacao'>
                            <ListItem alignItems="flex-start" component={Link} to={'/usuarios/'+recomendacao.usuario.id}>
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
                            {(cookies.perfil == "ADMINISTRADOR" || recomendacao.usuario.id == cookies.user) &&
                            <IconButton size='large'>
                                <div className='recomendacao-delete-icon'>
                                    <DeleteForeverRoundedIcon className='deletar-recomendacao-icon' onClick={handleDeleteRecomendacao}></DeleteForeverRoundedIcon>
                                </div>
                            </IconButton>
                            }
                            {(cookies.perfil == "ADMINISTRADOR"  || recomendacao.usuario.id == cookies.user) &&
                            <IconButton aria-label="editar" size='large'>
                                <div className='recomendacao-edit-icon'>
                                    <BorderColorRoundedIcon className='editar-recomendacao-icon'></BorderColorRoundedIcon>
                                </div>
                            </IconButton>
                            }
                        </Stack>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
  );
}