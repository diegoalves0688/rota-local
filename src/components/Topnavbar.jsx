import Button from '@mui/material/Button';
import React, {useState} from 'react';
import { useCookies } from 'react-cookie'
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// https://bootswatch.com/flatly/
export default function Topnavbar(){
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const handleLoginDialogOpen = () => {
        setOpenLoginDialog(true);
    };
    const handleLoginDialogClose = () => {
        setOpenLoginDialog(false);
    };
    const handleLoginDialogConfirm = () => {
        setOpenLoginDialog(false);
        navigate("/login")
    };

    const [openLogoffDialog, setOpenLogoffDialog] = useState(false)
    const handleLogoffDialogOpen = () => {
        setOpenLogoffDialog(true);
    };
    const handleLogoffDialogClose = () => {
        setOpenLogoffDialog(false);
    };
    const handleLogoffDialogConfirm = () => {
        setOpenLogoffDialog(false);
        setCookie('user', 'undefined', {path:'/', domain:'localhost'});
        setCookie('token', 'undefined', {path:'/', domain:'localhost'});
        setCookie('perfil', 'undefined', {path:'/', domain:'localhost'});
        navigate("/")
    };

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [buscaInput, setBuscaInput] = useState('')

    function logoff() {
        handleLogoffDialogOpen()
    }

    function usuarioLogado(){
        return cookies.user != null && cookies.user != 'undefined'
    }

    function handleBusca(){
        navigate("/busca/" + buscaInput)
    }

    function novaAtracaoHandle(){
        if (cookies.user != null && cookies.user != 'undefined') {
            navigate("/nova-atracao")
        }else{
            handleLoginDialogOpen()
        }
    }

    return (
        <div>
            <Dialog
                open={openLogoffDialog}
                onClose={handleLogoffDialogClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>{"Deseja realmente sair?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Ao deslogar do sistema não será possível executar algumas funções como criar atrações ou recomendações.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleLogoffDialogClose}>Desistir</Button>
                <Button onClick={handleLogoffDialogConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openLoginDialog}
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
                <Button onClick={handleLoginDialogConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Stack spacing={1}>
                        <form className="d-flex">
                            <Tooltip title="Digite um nome de uma atração para buscar">
                                <input 
                                className="form-control me-sm-2"
                                type="search"
                                onChange={e => setBuscaInput(e.target.value)}
                                value={buscaInput}
                                placeholder="Procurar atração"></input>
                            </Tooltip>
                            <button className="btn btn-secondary my-2 my-sm-0 buscar-atracao-button" type="submit" onClick={handleBusca}>Buscar</button>
                        </form>
                        <div className="collapse navbar-collapse" id="navbarColor04">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                <a className="nav-link active" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/PRAIAS">Praias</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/TRILHAS">Trilhas</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/RESTAURANTES">Restaurantes</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/MUSEUS">Museus</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/CACHOEIRAS">Cachoeiras</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/BOATES">Boates</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link active" href="/MONUMENTOS">Monumentos</a>
                                </li>
                            </ul>
                        </div>
                    </Stack>
                </div>
            </nav>
            <div className="button-perfil">
                {usuarioLogado() && 
                    <Button className='meu-perfil-button' color="secondary" size="small" href={"/usuarios/"+cookies.user}>Meu perfil</Button>
                }
                {usuarioLogado() && 
                    <Button className='logoff-button' color="secondary" size="small" onClick={logoff}>Sair</Button>
                }
                {!usuarioLogado() && 
                    <Button className='login-button' color="secondary" size="small" href="/login">Login</Button>
                }
                <Button className='nova-atravao-button' variant="contained" size="small" onClick={novaAtracaoHandle}>Nova Atração</Button>
            </div>
        </div>
    )
}