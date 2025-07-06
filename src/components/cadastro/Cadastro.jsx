import React from 'react'
import { Link } from 'react-router-dom'

function Cadastro() {
  return (
    <div>
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-[#101010] rounded-lg shadow border border-gray-900 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Crie sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">

                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Digite seu nickname</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Digite seu email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Senha</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white">Confirme a senha</label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Criar conta
                </button>
                <p className="text-sm font-light text-gray-400">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="font-medium text-red-500 hover:underline">Entre aqui</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cadastro;
