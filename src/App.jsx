import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Cadastro from './components/Cadastro'
import InicialPage from './components/InicialPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicialPage/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="*" element={<h1>Not Found </h1>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
