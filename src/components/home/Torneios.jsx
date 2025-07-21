import React, { useState, useEffect } from 'react';
import { Search, Calendar, Users, Trophy, Filter, DollarSign } from 'lucide-react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import axios from 'axios';

const TournamentSearchPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Lista de jogos baseada no modelo
  const gameChoices = [
    'League of Legends',
    'CS:GO',
    'Valorant',
    'FIFA',
    'Dragon Ball FighterZ'
  ];

 useEffect(() => {
  const loadTournaments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/torneios/', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        params: { public: true }
      });
      
      setTournaments(response.data);
      setFilteredTournaments(response.data);
    } catch (error) {
      console.error('Erro ao carregar torneios:', error);
    }
    setLoading(false);
  };

  loadTournaments();
}, []);

  // Filtrar torneios baseado nos critérios
  useEffect(() => {
    let filtered = tournaments;

    if (searchTerm) {
      filtered = filtered.filter(tournament =>
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGame) {
      filtered = filtered.filter(tournament => tournament.game === selectedGame);
    }

    if (selectedDate) {
      filtered = filtered.filter(tournament => tournament.date_start >= selectedDate);
    }

    setFilteredTournaments(filtered);
  }, [searchTerm, selectedGame, selectedDate, tournaments]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatValue = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

const handleJoinTournament = async (tournamentId) => {
  try {
    await axios.post(
      `http://localhost:8000/api/v1/torneios/${tournamentId}/join/`,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }
    );
    
    alert('Inscrição realizada com sucesso!');
    // Atualiza a lista de torneios
    const updatedTournaments = tournaments.map(t => {
      if (t.id === tournamentId) {
        return { ...t, is_participant: true };
      }
      return t;
    });
    setTournaments(updatedTournaments);
    setFilteredTournaments(updatedTournaments);
  } catch (error) {
    console.error('Erro ao se inscrever no torneio:', error);
    if (error.response?.data?.detail) {
      alert(error.response.data.detail);
    } else {
      alert('Erro ao se inscrever no torneio');
    }
  }
};

  if (loading) {
    return (
      <div className="flex h-screen bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p>Carregando torneios...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-red-500" />
                  Buscar Torneios
                </h1>
                <p className="mt-2 text-gray-400">
                  Encontre e participe dos melhores torneios públicos
                </p>
              </div>
              <div className="text-sm text-gray-400">
                {filteredTournaments.length} torneio(s) encontrado(s)
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-[#101010] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-white">Filtros</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Busca por nome */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Buscar por nome
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Digite o nome do torneio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Filtro por jogo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Jogo
                  </label>
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="">Todos os jogos</option>
                    {gameChoices.map(game => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por data */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data mínima
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Torneios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map(tournament => (
                <div key={tournament.id} className="bg-[#101010] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                  {/* Header do card */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white line-clamp-2">
                      {tournament.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
                      {tournament.game}
                    </span>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {tournament.description}
                  </p>

                  {/* Informações do torneio */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Início: {formatDate(tournament.date_start)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {tournament.participants_count} participantes
                    </div>
                    
                    {tournament.value > 0 && (
                      <div className="flex items-center text-sm text-green-500 font-medium">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Taxa de inscrição: {formatValue(tournament.value)}
                      </div>
                    )}
                  </div>

                  {/* Organizador */}
                  <div className="text-xs text-gray-500 mb-4">
                    Organizado por: <span className="text-gray-400">{tournament.owner.username}</span>
                  </div>

                  {/* Discord link */}
                  {tournament.server_discord && (
                    <div className="mb-4">
                      <a
                        href={tournament.server_discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-red-500 hover:text-red-400 transition-colors"
                      >
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.246.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                        </svg>
                        Discord
                      </a>
                    </div>
                  )}

                  {/* Botão de inscrição */}
                  <button
                    onClick={() => handleJoinTournament(tournament.id)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Participar do Torneio
                  </button>
                </div>
              ))}
            </div>

            {/* Mensagem quando não há torneios */}
            {filteredTournaments.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-white">
                  Nenhum torneio encontrado
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Tente ajustar os filtros para encontrar torneios disponíveis.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TournamentSearchPage;