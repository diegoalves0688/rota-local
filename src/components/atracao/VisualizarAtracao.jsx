import { React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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

export default function VisualizarAtracao() {
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

    const [thumbColor, setThumbColor] = useState('#074E58');
    const [thumbDisabled, setThumbDisabled] = useState(false);

    const params = useParams();

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
        }).catch(response => console.log(response))

        if (cookies.user != null && cookies.token != null){
            axios.get(process.env.REACT_APP_BACKEND_URL+'/api/avaliacao-atracao/usuario/'+cookies.user+'/atracao/'+params.atracaoId).then( response => {
                console.log(response.data)
                setThumbColor('#DCDCDC')
                setThumbDisabled(true)
            }).catch(response => console.log(response))
        }
    }, []);

    function handleRate(rate) {
        console.log(rate)
        if (cookies.user != null && cookies.token != null){
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
            alert("Usuário não logado!")
            navigate("/login")
        }        
    }

    function positiveRate(){
        handleRate(true);
    }

    function negativeRate(){
        handleRate(false);
    }

    function handleDelete() {
        if (cookies.user != null && cookies.token != null){
            axios.delete(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId, { headers: {
                'X-API-KEY': cookies.user,
                'X-API-TOKEN': cookies.token,
            }}).then((response) => {
                console.log(response);
                alert("Atração deletada com sucesso!")
                navigate("/")
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }        
    }

    return (
        <div className='visualizar-atracao-card'>
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
                            <Typography gutterBottom variant="h7" component="div">
                            <LocationOnIcon></LocationOnIcon>{cidade}, {estado}, {pais}
                            </Typography>
                            <Typography className='nome-atracao' gutterBottom variant="h3" component="div">
                            {nome}
                            {(cookies.perfil == "ADMINISTRADOR" || cookies.user == usuario) &&
                                <IconButton className='edit-icon-button' aria-label="editar" size='large'>
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