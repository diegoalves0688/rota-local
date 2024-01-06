
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie'
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// https://bootswatch.com/flatly/
export default function Topnavbar(){

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Stack spacing={1}>
                        <form className="d-flex">
                            <input className="form-control me-sm-2" type="search" placeholder="Procurar atração"></input>
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
                {cookies.user && 
                    <Button className='meu-perfil-button' color="secondary" size="small" href={"/usuarios/"+cookies.user}>Meu perfil</Button>
                }
                {cookies.user == null && 
                    <Button className='login-button' color="secondary" size="small" href="/login">Login</Button>
                }
            </div>
            <div className="button-nova-atracao"><Button className='nova-atravao-button' variant="contained" size="small" href="/nova-atracao">Nova Atração</Button></div>
        </div>
    )
}