import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';

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
            console.log(response);
            removeCookie('user');
            removeCookie('token');
            setCookie('user', response.data.userId);
            setCookie('token', response.data.token);
            alert("Usuário logado com sucesso!")
            navigate("/")
        });
    }

    return (
        <React.Fragment>
            <h3 className='form-novo-usuario-title'>Efetuar Login</h3>
            <form className='form-novo-usuario' onSubmit={handleSubmit} action={<Link to="/login" />} >
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
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
                </Stack>
                <Button className='novo-usuario-button' color="secondary" size="small" href="/novo-usuario">Novo usuário</Button>
                <Button className='login-entrar-button' variant="contained" type="submit">Entrar</Button>
            </form>     
        </React.Fragment>
    )
}