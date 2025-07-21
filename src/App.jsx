import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Cadastro from './components/cadastro/Cadastro';
import InicialPage from './components/inicialPage/InicialPage';
import Logout from './components/logout/Logout';
import PrivateRouter from './components/protect/PrivateRouter';
import { AuthProvider } from './contexts/AuthContext';
import Perfil from './components/home/Perfil';
import CriarTonreio from "./components/home/CriarTorneio"
import Torneios from './components/home/Torneios';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicialPage/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
          
          {/* Rotas Protegidas */}
          <Route path="/home" element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          } />
          <Route path="/perfil" element={
            <PrivateRouter>
              <Perfil />
            </PrivateRouter>
          } />
          <Route path="/torneios" element={
            <PrivateRouter>
              <Torneios />
            </PrivateRouter>
          } />
          <Route path="/criar-torneio" element={
            <PrivateRouter>
              <CriarTonreio />
            </PrivateRouter>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;