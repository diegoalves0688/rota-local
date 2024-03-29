import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { TextField, Button, Stack, Select, Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditarAtracaoForm() {
    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [descricao, setDescricao] = useState('')

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);


    const params = useParams();
    useEffect( () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId).then( response => {
            console.log(response.data)
            setNome(response.data.nome)
            setPais(response.data.localizacao.pais)
            setEstado(response.data.localizacao.estado)
            setCidade(response.data.localizacao.cidade)
            setDescricao(response.data.descricao)
            setCategoria(response.data.categoria)
        }).catch(response => console.log(response))
    }, [params.atracaoId]);

    function handleSubmit(event) {
        event.preventDefault();
        if (cookies.user != null && cookies.token != null){
            axios.put(process.env.REACT_APP_BACKEND_URL+'/api/atracao/'+params.atracaoId, {
                nome: nome,
                descricao: descricao,
                categoria: categoria,
                localizacao: {pais:pais, estado:estado, cidade:cidade} 
              },{ headers: {
                        'X-API-KEY': cookies.user,
                        'X-API-TOKEN': cookies.token,
                }}).then((response) => {
                handleUpdateDialogOpen()
            });
        } else {
            alert("Usuário não logado!")
            navigate("/login")
        }
    }

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true);
    };
    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false);
        navigate("/")
    };

    return (
        <React.Fragment>
            <Dialog
                open={updateDialogOpen}
                onClose={handleUpdateDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Feito!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Sua atração foi alterada com sucesso!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleUpdateDialogClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
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
                <Button variant="outlined" color="secondary" type="submit">Salvar</Button>
            </form>     
        </React.Fragment>
    )
}