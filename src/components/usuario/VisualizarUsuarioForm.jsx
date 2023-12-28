import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { TextField, Stack, Avatar } from '@mui/material';
import { Link } from "react-router-dom"
import axios from 'axios';

export default function VisualizarUsuarioForm() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [imagem, setImagem] = useState('')
 
    const params = useParams();
    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/usuario/'+params.usuarioId).then( response => {
            console.log(response.data)
            setNome(response.data.nome)
            setEmail(response.data.email)
            setImagem(response.data.foto)
        }).catch(response => console.log(response))
    }, []);

    return (
        <React.Fragment>
            <form className='form-visualizar-usuario' action={<Link to="/login" />} >
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <Avatar
                    alt={nome}
                    src={imagem}
                    sx={{ width: 256, height: 256, marginBottom: 4 }}
                    />

                    <h3 className='form-visualizar-usuario-title'>{nome}</h3>
                </Stack>
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nome de usuário"
                        value={nome}
                        fullWidth
                        required
                        disabled
                    />

                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        value={email}
                        fullWidth
                        required
                        disabled
                    />
                </Stack>
            </form>     
        </React.Fragment>
    )
}