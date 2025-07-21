import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function CriarTorneio() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    game: '',
    date_start: '',
    value: 0.00,
    server_discord: '',
    public: true
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Opções de jogos baseadas no modelo Django
  const gameOptions = [
    'League of Legends',
    'CS:GO', 
    'Valorant',
    'FIFA',
    'Dragon Ball FighterZ'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do torneio é obrigatório';
    }

    if (!formData.game.trim()) {
      newErrors.game = 'Jogo é obrigatório';
    }

    if (!formData.date_start) {
      newErrors.date_start = 'Data de início é obrigatória';
    } else {
      const selectedDate = new Date(formData.date_start);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date_start = 'Data de início deve ser hoje ou no futuro';
      }
    }

    if (formData.value < 0) {
      newErrors.value = 'Valor não pode ser negativo';
    }

    if (formData.server_discord && formData.server_discord.trim()) {
      try {
        new URL(formData.server_discord);
      } catch {
        newErrors.server_discord = 'URL do Discord inválida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Preparar dados para envio - ajustar campos vazios
      const dataToSend = {
        ...formData,
        description: formData.description.trim() || null,
        server_discord: formData.server_discord.trim() || null,
        value: parseFloat(formData.value)
      };

      const response = await axios.post('http://localhost:8000/api/v1/tournaments/', dataToSend, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        }
      });

      console.log('Torneio criado:', response.data);
      
      // Redirecionar para página de torneios ou mostrar mensagem de sucesso
      navigate('/torneios');
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      
      if (error.response?.data) {
        // Se a API retornar erros específicos por campo
        if (typeof error.response.data === 'object') {
          setErrors(error.response.data);
        } else {
          setErrors({ general: 'Erro ao criar torneio. Tente novamente.' });
        }
      } else {
        setErrors({ general: 'Erro de conexão. Verifique sua internet e tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      game: '',
      date_start: '',
      value: 0.00,
      server_discord: '',
      public: true
    });
    setErrors({});
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Criar Torneio</h1>
              <button
                onClick={() => navigate('/torneios')}
                className="text-gray-400 hover:text-white transition-colors"
                title="Voltar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mensagem de erro geral */}
            {errors.general && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Informações Básicas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Nome do Torneio *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      maxLength={100}
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                      }`}
                      placeholder="Ex: Campeonato de CS:GO 2024"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Jogo *
                    </label>
                    <select
                      name="game"
                      value={formData.game}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                        errors.game ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                      }`}
                    >
                      <option value="">Selecione um jogo</option>
                      {gameOptions.map((game) => (
                        <option key={game} value={game}>{game}</option>
                      ))}
                    </select>
                    {errors.game && <p className="text-red-500 text-sm mt-1">{errors.game}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                    placeholder="Descreva seu torneio, regras, formato, premiação, etc..."
                  />
                </div>
              </div>

              {/* Configurações do Torneio */}
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Configurações</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Data de Início *
                    </label>
                    <input
                      type="date"
                      name="date_start"
                      value={formData.date_start}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                        errors.date_start ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                      }`}
                    />
                    {errors.date_start && <p className="text-red-500 text-sm mt-1">{errors.date_start}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Taxa de Inscrição (R$)
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                        errors.value ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                    <p className="text-gray-400 text-xs mt-1">
                      Deixe em 0.00 para torneio gratuito
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Servidor Discord
                  </label>
                  <input
                    type="url"
                    name="server_discord"
                    value={formData.server_discord}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.server_discord ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                    }`}
                    placeholder="https://discord.gg/seuservidor"
                  />
                  {errors.server_discord && <p className="text-red-500 text-sm mt-1">{errors.server_discord}</p>}
                  <p className="text-gray-400 text-xs mt-1">
                    Link para o servidor Discord do torneio (opcional)
                  </p>
                </div>
              </div>

              {/* Configurações de Visibilidade */}
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Visibilidade</h2>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="public"
                    id="public"
                    checked={formData.public}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <div>
                    <label htmlFor="public" className="block text-gray-300 text-sm font-medium">
                      Torneio Público
                    </label>
                    <p className="text-gray-400 text-xs mt-1">
                      Marque esta opção para que o torneio seja visível para todos os usuários. 
                      Caso contrário, apenas você poderá visualizá-lo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
                  disabled={loading}
                >
                  Limpar
                </button>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate('/torneios')}
                    className="px-6 py-2 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Criando...' : 'Criar Torneio'}
                  </button>
                </div>
              </div>
            </form>

            {/* Informações Adicionais */}
            <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                ℹ️ Informações Importantes
              </h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Após criar o torneio, você será automaticamente definido como organizador</li>
                <li>• Torneios públicos podem ser visualizados por todos os usuários</li>
                <li>• A taxa de inscrição é opcional (deixe em 0.00 para torneio gratuito)</li>
                <li>• O link do Discord é opcional e pode ser usado para comunicação</li>
                <li>• A data de início deve ser hoje ou no futuro</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CriarTorneio;