import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await axios.post('http://localhost:8000/api/cadastro/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'Erro de conexão. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-[#101010] rounded-lg shadow border border-gray-900 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Crie sua conta
              </h1>

              {errors.general && (
                <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Digite seu nickname</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    placeholder="Seu nickname"
                    required
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Digite seu email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    placeholder="seu@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password1" className="block mb-2 text-sm font-medium text-white">Senha</label>
                  <input
                    type="password"
                    name="password1"
                    id="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                  {errors.password1 && <p className="text-red-500 text-sm mt-1">{errors.password1}</p>}
                </div>

                <div>
                  <label htmlFor="password2" className="block mb-2 text-sm font-medium text-white">Confirme a senha</label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    className="bg-[#1f1f1f] border border-gray-950 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                  {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
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
  );
}

export default Cadastro;
