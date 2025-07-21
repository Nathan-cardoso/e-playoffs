import React from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function Home() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards de estatísticas */}
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Torneios Ativos</h3>
                <p className="text-3xl font-bold text-red-500">12</p>
              </div>
              
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Participações</h3>
                <p className="text-3xl font-bold text-green-500">8</p>
              </div>
              
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Vitórias</h3>
                <p className="text-3xl font-bold text-blue-500">5</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;