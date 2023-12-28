
import Button from '@mui/material/Button';

// https://bootswatch.com/flatly/
export default function Topnavbar(){

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor04">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link active" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="/PRAIAS">Praias</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/TRILHAS">Trilhas</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/RESTAURANTES">Restaurantes</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/MUSEUS">Museus</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/CACHOEIRAS">Cachoeiras</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/BOATES">Boates</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/MONUMENTOS">Monumentos</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Buscar atração"></input>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
                </div>
                
            </div>
            </nav>
            <div className="button-perfil">
                <Button variant="outlined" color="secondary" size="small" href="/novo-usuario">Novo usuário</Button>
                <Button variant="outlined" color="secondary" size="small" href="/login">Login</Button>
                <Button variant="outlined" color="secondary" size="small" href="/usuarios/1">Meu perfil</Button>    
            </div>
            <div className="button-nova-atracao"><Button variant="contained" size="small" href="/nova-atracao">Nova Atração</Button></div>
        </div>
    )
}