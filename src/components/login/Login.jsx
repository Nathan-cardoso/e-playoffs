import React from 'react'
import logo from '../../../public/imgs/logo.png';
import { Link } from 'react-router-dom';
function Login() {
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
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Seu email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-[#1f1f1f] border border-gray-950 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
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
                >
                  Entrar
                </button>
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
