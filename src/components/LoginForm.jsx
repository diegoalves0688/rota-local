import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

export default function LoginForm() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();

        axios.post(process.env.REACT_APP_BACKEND_URL+'/api/usuario/autenticar', {
            email: email,
            senha: senha,
        }).then((response) => {
            setCookie('user', response.data.userId, {path:'/', domain:'localhost'});
            setCookie('token', response.data.token, {path:'/', domain:'localhost'});
            setCookie('perfil', response.data.perfil, {path:'/', domain:'localhost'});
            alert("Usuário logado com sucesso!")
            navigate("/")
        });
    }

    return (
        <React.Fragment>
            <h3 className='form-novo-usuario-title'>Efetuar Login</h3>
            <form className='form-novo-usuario' onSubmit={handleSubmit} action={<Link to="/login" />} >
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Caso já tenha cadastro, preencha este campo com o email cadastrado.">
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
                    </Tooltip>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Caso já tenha cadastro, preencha este campo com a senha cadastrada.">
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
                    </Tooltip>
                </Stack>
                <Button className='novo-usuario-button' color="secondary" size="small" href="/novo-usuario">Novo usuário</Button>
                <Button className='login-entrar-button' variant="contained" type="submit">Entrar</Button>
            </form>     
        </React.Fragment>
    )
}