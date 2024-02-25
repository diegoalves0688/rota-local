import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import LoginUsuario from './pages/Login';
import NovaAtracao from './pages/NovaAtracao';
import NovoUsuario from './pages/NovoUsuario';
import VisualizarAtracao from './pages/VisualizarAtracao';
import VisualizarUsuario from './pages/VisualizarUsuario';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditarAtracao from './pages/EditarAtracao';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:categoria" element={<Home />}></Route>
          <Route path="/nova-atracao" element={<NovaAtracao />}></Route>
          <Route path="/atracoes/:atracaoId" element={<VisualizarAtracao />} />
          <Route path="/login" element={<LoginUsuario />}></Route>
          <Route path="/novo-usuario" element={<NovoUsuario />}></Route>
          <Route path="/usuarios/:usuarioId" element={<VisualizarUsuario />}></Route>
          <Route path="/editar-atracao/:atracaoId" element={<EditarAtracao />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
