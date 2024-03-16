import { React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from "react-router-dom";

import { useCookies } from 'react-cookie'
import axios from 'axios';

import Stack from '@mui/material/Stack';

import Badge from '@mui/material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Avatar from '@mui/material/Avatar';

export default function VisualizarAtracao() {

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

    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);

    const [nome, setNome] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [descricao, setDescricao] = useState('')
    const [ranking, setRanking] = useState('')
    const [foto, setFoto] = useState('')
    const [usuario, setUsuario] = useState('')
    const [usuarioNome, setUsuarioNome] = useState('')
    const [usuarioFoto, setUsuarioFoto] = useState('')
    const [dataRegistro, setDataRegistro] = useState('')

    const [thumbColor, setThumbColor] = useState('#074E58');
    const [thumbDisabled, setThumbDisabled] = useState(false);

    const params = useParams();

    function isLogged(){
        return cookies.user != "undefined" && cookies.user != null
    }

    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId).then( response => {
            console.log(response.data)
            setNome(response.data.nome)
            setPais(response.data.localizacao.pais)
            setEstado(response.data.localizacao.estado)
            setCidade(response.data.localizacao.cidade)
            setDescricao(response.data.descricao)
            setFoto(response.data.imagens[0].urlCaminho)
            setRanking(response.data.atracaoRanking)
            setUsuario(response.data.usuario.id)
            setUsuarioNome(response.data.usuario.nome)
            setUsuarioFoto(response.data.usuario.foto)
            setDataRegistro(response.data.dataRegistro)
        }).catch(response => console.log(response))

        if (isLogged()){
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/avaliacao-atracao/usuario/'+cookies.user+'/atracao/'+params.atracaoId).then( response => {
                console.log(response.data)
                setThumbColor('#DCDCDC')
                setThumbDisabled(true)
            }).catch(response => console.log(response))
        }
    }, []);

    function handleRate(rate) {
        console.log(rate)
        if (isLogged()){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/avaliacao-atracao/usuario/'+cookies.user+'/atracao/'+params.atracaoId, {
                avaliacaoPositiva: rate,
            }, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                console.log(response);
                alert("Avaliação salva com sucesso!")
                window.location.reload(false);
            });
        } else {
            handleLoginDialogOpen()
        }        
    }

    function positiveRate(){
        handleRate(true);
    }

    function negativeRate(){
        handleRate(false);
    }

    function handleDelete() {
        if (isLogged()){
            axios.delete(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                console.log(response);
                alert("Atração deletada com sucesso!")
                navigate("/")
            });
        } else {
            handleLoginDialogOpen()
        }        
    }

    function editar(){
        navigate("/editar-atracao/"+params.atracaoId)
    }

    return (
        <div className='visualizar-atracao-card'>
            <Dialog
                open={open}
                onClose={handleLoginDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Usuário não logado."}</DialogTitle>
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
            <Stack direction="row" spacing={1}>
                <Badge className='badge-atracao' badgeContent={'#' + ranking} color="primary">
                    <Card sx={{ maxWidth: 800 }}>
                        <CardMedia
                            sx={{ height: 500 }}
                            image={foto}
                            component="img"
                            alt=" e"
                            title="imagem"
                        />
                        <CardContent className='visualizar-atracao-conteudo'>
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="h7" component="div">
                                    <LocationOnIcon></LocationOnIcon>{cidade}, {estado}, {pais}
                                    </Typography>
                                    <Typography className='nome-atracao' gutterBottom variant="h3" component="div">
                                    {nome}
                                    {(cookies.perfil == "ADMINISTRADOR" || cookies.user == usuario) &&
                                        <IconButton className='edit-icon-button' aria-label="editar" size='large' onClick={editar}>
                                            <div className='edit-icon'>
                                                <BorderColorRoundedIcon className='editar-atracao-icon'></BorderColorRoundedIcon>
                                            </div>
                                        </IconButton>
                                    }
                                    {(cookies.perfil == "ADMINISTRADOR" || cookies.user == usuario) &&
                                        <IconButton aria-label="deletar" size='large' onClick={handleDelete}>
                                            <div className='delete-icon'>
                                                <DeleteForeverRoundedIcon className='deletar-atracao-icon'></DeleteForeverRoundedIcon>
                                            </div>
                                        </IconButton>
                                    }
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary">
                                    {descricao}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <ListItem alignItems="flex-start" component={Link} to={'/usuarios/'+usuario}>
                                    <ListItemAvatar>
                                        <Avatar alt={usuarioNome} src={usuarioFoto} />
                                    </ListItemAvatar>
                                    <ListItemText className='autor-conteudo'
                                        primary={usuarioNome}
                                        secondary={dataRegistro}
                                    />
                                </ListItem>
                            </Box>  
                        </CardContent>
                    </Card>
                </Badge>
                <Stack spacing={1} className='stack-thumb-avaliacao'>
                    <IconButton disabled={thumbDisabled} color="primary" aria-label="positivo" size='large' onClick={positiveRate}>
                        <div className='thumb-avaliacao'>
                            <ThumbUpIcon style={{ 'color': thumbColor}} className='thumb-avaliacao-icon'></ThumbUpIcon>
                        </div>
                    </IconButton>
                    <IconButton disabled={thumbDisabled} aria-label="negativo" size='large' onClick={negativeRate}>
                        <div className='thumb-avaliacao'>
                            <ThumbDownAltIcon style={{ 'color': thumbColor}} className='thumb-avaliacao-icon'></ThumbDownAltIcon>
                        </div>
                    </IconButton>
                </Stack>
            </Stack>
        </div>
    )
}