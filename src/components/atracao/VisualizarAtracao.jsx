import { React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function VisualizarAtracao() {

    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [descricao, setDescricao] = useState('')
    const [foto, setFoto] = useState('')

    const params = useParams();
    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracoes/'+params.atracaoId).then( response => {
            console.log(response.data)
            setNome(response.data.nome)
            setCategoria(response.data.categoria)
            setPais(response.data.pais)
            setEstado(response.data.estado)
            setCidade(response.data.cidade)
            setDescricao(response.data.descricao)
            setFoto(response.data.foto)
        }).catch(response => console.log(response))
    }, []);

    return (
        <div className='visualizar-atracao-card'>
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
                    Cidade, país
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    {nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {descricao}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}