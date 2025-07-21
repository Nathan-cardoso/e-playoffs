import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function Home() {
  const [stats, setStats] = useState({
    activeTournaments: 0,
    participations: 0,
    wins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tournamentsRes, participationsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/torneios/', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            params: {
              date_start__gte: new Date().toISOString().split('T')[0]
            }
          }),
          axios.get('http://localhost:8000/api/v1/torneios/', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            params: {
              participants__player: 'me'
            }
          })
        ]);

        setStats({
          activeTournaments: tournamentsRes.data.length,
          participations: participationsRes.data.length,
          wins: 0 // Você precisará implementar lógica de vitórias
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-white">Carregando...</div>
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
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Torneios Ativos</h3>
                <p className="text-3xl font-bold text-red-500">{stats.activeTournaments}</p>
              </div>
              
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Participações</h3>
                <p className="text-3xl font-bold text-green-500">{stats.participations}</p>
              </div>
              
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Vitórias</h3>
                <p className="text-3xl font-bold text-blue-500">{stats.wins}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;