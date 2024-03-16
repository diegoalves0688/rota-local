import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

export default function NovoUsuarioForm() {

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
        
        if (senha == senhaConfirmacao){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/imagem/usuario', formData)
            .then((response) => {
                return response.data.urlCaminho
            }).then((urlCaminho) => {
                console.log(nome, email, senha, senhaConfirmacao, urlCaminho) 
                axios.post(process.env.REACT_APP_BACKEND_URL+'/api/usuario', {
                    nome: nome,
                    email: email,
                    senha: senha,
                    foto: urlCaminho,
                    ativo: true,
                    perfil: "COLABORADOR",
                }).then((response) => {
                    console.log(response);
                    alert("Usuário criado com sucesso!")
                    navigate("/")
                });
            });
        } else {
            alert("Senha inválida!")
        }
    }

    return (
        <React.Fragment>
            <h3 className='form-novo-usuario-title'>Cadastro de novo usuário</h3>
            <form className='form-novo-usuario' onSubmit={handleSubmit} action={<Link to="/login" />} >
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Preencha esse campo com o nome do usuário que você deseja criar">
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
                    </Tooltip>
                    <Tooltip title="Preencha esse campo com o email do usuário que você deseja criar">
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
                    <Tooltip title="Preencha esse campo com a senha do usuário que você deseja criar">
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
                    <Tooltip title="Repita a senha do usuário que você deseja criar">
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
                    </Tooltip>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Selecione uma imagem para o usuário que você deseja criar">
                        <input 
                        name="image" 
                        type="file"
                        onChange={e => setFile(e.target.files[0])}>
                        </input>
                    </Tooltip>
                </Stack>
                <Button className='novo-usuario-form-button' variant="contained" type="submit">Salvar</Button>
            </form>     
        </React.Fragment>
    )
}