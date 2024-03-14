import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NovaRecomendacaoForm() {

    const navigate = useNavigate();
    const params = useParams();

    const [cookies, setCookie] = useCookies(['user']);
    const [recomendacao, setRecomendacao] = useState('')
    const atracaoId = params.atracaoId;

    const [open, setOpen] = useState(false)
    const handleLoginDialogOpen = () => {
        setOpen(true);
    };
    const handleLoginDialogClose = () => {
        setOpen(false);
    };
    const handleDialogConfirm = () => {
        setOpen(false);
        navigate("/login")
    };

    function isLogged(){
        return cookies.user != "undefined" && cookies.user != null
    }
 
    function handleSubmit(event) {
        event.preventDefault();

        if (isLogged()){
            axios.post(process.env.REACT_APP_BACKEND_URL+'/api/recomendacao-atracao/usuario/' + cookies.user + '/atracao/' + atracaoId, {
                recomendacao: recomendacao,
            }, {
                headers: {
                    'X-API-KEY': cookies.user,
                    'X-API-TOKEN': cookies.token,
                }
            }).then((response) => {
                console.log(response);
                alert("Recomendação criada com sucesso!")
                window.location.reload(false);
            });
        } else {
            handleLoginDialogOpen()
        }        
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleLoginDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Usuário não logado."}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Deseja ser redirecionado para a página de login?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleLoginDialogClose}>Desistir</Button>
                <Button onClick={handleDialogConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <form className='form-nova-recomendacao' onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}} title="">
                    <Tooltip title="Preencha com sua recomendação sobre essa atração">
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Digite sua recomendação"
                            onChange={e => setRecomendacao(e.target.value)}
                            value={recomendacao}
                            fullWidth
                            required
                        />
                    </Tooltip>
                </Stack>
                <Button className='salvar-recomendacao-button' variant="contained" type="submit">Salvar Recomendação</Button>
            </form>     
        </React.Fragment>
    )
}