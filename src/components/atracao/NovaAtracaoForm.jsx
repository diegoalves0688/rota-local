import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

export default function NovaAtracaoForm() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [descricao, setDescricao] = useState('')
    const [file, setFile] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    
        axios.post(process.env.REACT_APP_BACKEND_URL+'/images', formData)
        .then((response) => {
            return response.data.imageUrl
        }).then((imageUrl) => {
            console.log(nome, categoria, pais, estado, cidade, descricao, imageUrl) 
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/atracoes', {
                nome: nome,
                categoria: categoria,
                pais: pais,
                estado: estado,
                cidade: cidade,
                descricao: descricao,
                foto: imageUrl,
            }).then((response) => {
                console.log(response);
                alert("Atração criada com sucesso!")
                navigate("/")
            });
        });

        
    }

    return (
        <React.Fragment>
            <h3 className='form-nova-atracao-title'>Cadastro de nova atração</h3>
            <form className='form-nova-atracao' onSubmit={handleSubmit} action={<Link to="/login" />} >
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nome da atração"
                        onChange={e => setNome(e.target.value)}
                        value={nome}
                        fullWidth
                        required
                    />

                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Categoria"
                        onChange={e => setCategoria(e.target.value)}
                        value={categoria}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="País"
                        onChange={e => setPais(e.target.value)}
                        value={pais}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Estado"
                        onChange={e => setEstado(e.target.value)}
                        value={estado}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Cidade"
                        onChange={e => setCidade(e.target.value)}
                        value={cidade}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Descrição"
                        onChange={e => setDescricao(e.target.value)}
                        value={descricao}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        sx={{marginBottom: 4}}
                    />
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