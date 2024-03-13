
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie'
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

// https://bootswatch.com/flatly/
export default function Topnavbar(){

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    function logoff() {
        setCookie('user', 'undefined', {path:'/', domain:'localhost'});
        setCookie('token', 'undefined', {path:'/', domain:'localhost'});
        setCookie('perfil', 'undefined', {path:'/', domain:'localhost'});
        alert("Logoff realizado com sucesso!")
        window.location.reload();
    }

    function usuarioLogado(){
        return cookies.user != null && cookies.user != 'undefined'
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Stack spacing={1}>
                        <form className="d-flex">
                            <Tooltip title="Digite um nome de uma atração para buscar">
                                <input className="form-control me-sm-2" type="search" placeholder="Procurar atração"></input>
                            </Tooltip>
                            <button className="btn btn-secondary my-2 my-sm-0 buscar-atracao-button" type="submit">Buscar</button>
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
            </div>
            <div className="button-nova-atracao"><Button className='nova-atravao-button' variant="contained" size="small" href="/nova-atracao">Nova Atração</Button></div>
        </div>
    )
}