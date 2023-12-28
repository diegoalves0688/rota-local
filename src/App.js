import './App.css';
import 'bootswatch/dist/flatly/bootstrap.min.css'
import Home from './pages/Home'
import NovaAtracao from './pages/NovaAtracao'
import VisualizarAtracao from './pages/VisualizarAtracao'
import NovoUsuario from './pages/NovoUsuario'
import VisualizarUsuario from './pages/VisualizarUsuario'
import LoginUsuario from './pages/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
