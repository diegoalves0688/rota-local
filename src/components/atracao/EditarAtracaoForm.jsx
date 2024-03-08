import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditarAtracaoForm() {

    const navigate = useNavigate();

    const [cookies] = useCookies(['user']);

    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [descricao, setDescricao] = useState('')
    const [file, setFile] = useState('')
 

    const params = useParams();
    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId).then( response => {
            console.log(response.data)
            setNome(response.data.nome)
            setPais(response.data.localizacao.pais)
            setEstado(response.data.localizacao.estado)
            setCidade(response.data.localizacao.cidade)
            setDescricao(response.data.descricao)
            // setFoto(response.data.imagens[0].urlCaminho)
            // setRanking(response.data.atracaoRanking)
            // setUsuario(response.data.usuario.id)
        }).catch(response => console.log(response))
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        if (cookies.user != null && cookies.token != null){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/atracao', {
                nome: nome,
                categoria: categoria,
                descricao: descricao,
                usuario: {
                    id: cookies.user
                },
                localizacao: {
                    pais: pais,
                    estado: estado,
                    cidade: cidade,
                }
                },{ headers: {
                        'X-API-KEY': cookies.user,
                        'X-API-TOKEN': cookies.token,
                }}).then((response) => {
                console.log(response);
                alert("Atração criada com sucesso!")
    
                formData.append('usuario', 1);
                formData.append('atracao', response.data.id);
                axios.post(process.env.REACT_APP_BACKEND_URL+'/api/imagem', formData)
                .then((response) => {
                    console.log(response.data)
                    return response.data.imageUrl
                })
    
                navigate("/")
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }
        
    }

    return (
        <React.Fragment>
            <h3 className='form-editar-atracao-title'>Editar atração</h3>
            <form className='form-editar-atracao' onSubmit={handleSubmit} action={<Link to="/login" />} >
                
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

                    <Box sx={{ minWidth: 220 }}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ paddingLeft: 2 }} variant="standard" htmlFor="uncontrolled-native">
                                Categoria*
                            </InputLabel>
                            <Select
                                variant='outlined'
                                color='secondary'
                                label="Categoria"
                                onChange={e => setCategoria(e.target.value)}
                                value={categoria}
                                fullWidth
                                required>

                                <MenuItem value={"PRAIAS"}>Praias</MenuItem>
                                <MenuItem value={"TRILHAS"}>Trilhas</MenuItem>
                                <MenuItem value={"RESTAURANTES"}>Restaurantes</MenuItem>
                                <MenuItem value={"MUSEUS"}>Museus</MenuItem>
                                <MenuItem value={"CACHOEIRAS"}>Cachoeiras</MenuItem>
                                <MenuItem value={"BOATES"}>Boates</MenuItem>
                                <MenuItem value={"MONUMENTOS"}>Monumentos</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

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