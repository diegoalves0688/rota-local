import './App.css';
import 'bootswatch/dist/flatly/bootstrap.min.css'
import Home from './pages/Home'
import NovaAtracao from './pages/NovaAtracao'
import NovoUsuario from './pages/NovoUsuario'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/nova-atracao" element={<NovaAtracao />}></Route>
          <Route path="/novo-usuario" element={<NovoUsuario />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
