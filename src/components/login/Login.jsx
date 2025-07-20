import React from 'react'
import logo from '../../../public/imgs/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function Login(){
  const [username, setusername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth(); // Adicione esta linha

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login falhou');
      }

      const data = await response.json();

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      setAuthenticatedUser(); // Atualiza o estado de autenticação
      navigate('/home');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">  
            <img src={logo} className="w-auto h-40 mr-2" alt="Eplayoffs Logo" />
          </a>
          <div className="w-full bg-[#101010] rounded-lg shadow border border-gray-900 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Entre com sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-[#1f1f1f] border border-gray-950 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                    value={username}
                    onChange={e => setusername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Senha</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-[#1f1f1f] border border-gray-950 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-600 rounded bg-[#101010] focus:ring-red-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-300">Lembrar de mim</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-red-500 hover:underline">Esqueceu a senha?</a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <p className="text-sm font-light text-gray-400">
                  Ainda não tem uma conta?{' '}
                  <Link to="/cadastro" className="font-medium text-red-500 hover:underline">Cadastre-se</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login;