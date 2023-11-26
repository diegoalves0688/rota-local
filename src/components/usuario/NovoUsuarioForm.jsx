import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

export default function NovaAtracaoForm() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('')
    const [file, setFile] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    
        axios.post(process.env.REACT_APP_BACKEND_URL+'/images', formData)
        .then((response) => {
            return response.data.imageUrl
        }).then((imageUrl) => {
            console.log(nome, email, senha, senhaConfirmacao, imageUrl) 
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/usuarios', {
                nome: nome,
                email: email,
                senha: senha,
                foto: imageUrl,
            }).then((response) => {
                console.log(response);
                alert("Usuário criado com sucesso!")
                navigate("/")
            });
        });
    }

    return (
        <React.Fragment>
            <h3 className='form-novo-usuario-title'>Cadastro de novo usuário</h3>
            <form className='form-novo-usuario' onSubmit={handleSubmit} action={<Link to="/login" />} >
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nome de usuário"
                        onChange={e => setNome(e.target.value)}
                        value={nome}
                        fullWidth
                        required
                    />

                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Senha"
                        onChange={e => setSenha(e.target.value)}
                        value={senha}
                        fullWidth
                        required
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Confirmar senha"
                        onChange={e => setSenhaConfirmacao(e.target.value)}
                        value={senhaConfirmacao}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <input 
                    name="image" 
                    type="file"
                    onChange={e => setFile(e.target.files[0])}>
                    </input>
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Salvar</Button>
            </form>     
        </React.Fragment>
    )
}