import React, {useState} from 'react';
import { TextField, Button, Stack, Select, Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NovaAtracaoForm() {

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['user']);

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

        if (cookies.user != "undefined" && cookies.user != null){
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
                formData.append('usuario', 1);
                formData.append('atracao', response.data.id);
                axios.post(process.env.REACT_APP_BACKEND_URL+'/api/imagem', formData)
                .then((response) => {
                    handleDialogOpen();
                    return response.data.imageUrl
                })
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }
        
    }

    const [dialogOpen, setDialogOpen] = useState(false)
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate("/")
    };

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Sucesso!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Atração criada e disponível no sistema.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
            <h3 className='form-nova-atracao-title'>Cadastro de nova atração</h3>
            <form className='form-nova-atracao' onSubmit={handleSubmit} action={<Link to="/login" />} >
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Preencha esse campo com o nome da atração que você deseja criar">
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
                    </Tooltip>
                    <Box sx={{ minWidth: 220 }}>
                        <Tooltip 
                            title="Selecione uma categoria para a atração que você deseja criar">
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
                                    title=''
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
                        </Tooltip>
                    </Box>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Preencha esse campo com o nome do país da atração que você deseja criar">
                        <TextField
                            type="text"
                            title=''
                            variant='outlined'
                            color='secondary'
                            label="País"
                            onChange={e => setPais(e.target.value)}
                            value={pais}
                            fullWidth
                            required
                        />
                    </Tooltip>
                    <Tooltip title="Preencha esse campo com o nome do estado da atração que você deseja criar">
                        <TextField
                            type="text"
                            title=''
                            variant='outlined'
                            color='secondary'
                            label="Estado"
                            onChange={e => setEstado(e.target.value)}
                            value={estado}
                            fullWidth
                            required
                        />
                    </Tooltip>
                    <Tooltip title="Preencha esse campo com o nome da cidade da atração que você deseja criar">
                        <TextField
                            type="text"
                            title=''
                            variant='outlined'
                            color='secondary'
                            label="Cidade"
                            onChange={e => setCidade(e.target.value)}
                            value={cidade}
                            fullWidth
                            required
                        />
                    </Tooltip>
                </Stack>
                <Tooltip title="Preencha esse campo com a descrição da atração que você deseja criar">
                    <TextField
                        type="text"
                        title=''
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
                </Tooltip>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Selecione uma imagem para a atração que você deseja criar">
                        <input 
                            title=''
                            name="image" 
                            type="file"
                            onChange={e => setFile(e.target.files[0])}>
                        </input>
                    </Tooltip>
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Salvar</Button>
            </form>     
        </React.Fragment>
    )
}