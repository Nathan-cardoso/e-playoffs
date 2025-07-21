import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function Perfil() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profile_image: null,
    bio: '',
    instagram: '',
    x: '',
    youtube: '',
    twitch: '',
    date_joined: '',
    tournaments_participated: [],
    torneios_owned: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profile_image: null,
    bio: '',
    instagram: '',
    x: '',
    youtube: '',
    twitch: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const { logout } = useAuth();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/players/me/', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    
    setUser(response.data);
    setFormData({
      username: response.data.username,
      email: response.data.email,
      profile_image: response.data.profile_image,
      bio: response.data.bio || '',
      instagram: response.data.instagram || '',
      x: response.data.x || '',
      youtube: response.data.youtube || '',
      twitch: response.data.twitch || ''
    });
    setLoading(false);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    if (error.response?.status === 401) {
      logout();
    }
    setLoading(false);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro específico
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_image: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar URLs das redes sociais se preenchidas
    const urlFields = ['instagram', 'x', 'youtube', 'twitch'];
    urlFields.forEach(field => {
      if (formData[field] && formData[field].trim()) {
        try {
          new URL(formData[field]);
        } catch {
          newErrors[field] = 'URL inválida';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSave = async () => {
  if (!validateForm()) {
    return;
  }

  setSaving(true);
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('bio', formData.bio || '');
    formDataToSend.append('instagram', formData.instagram || '');
    formDataToSend.append('x', formData.x || '');
    formDataToSend.append('youtube', formData.youtube || '');
    formDataToSend.append('twitch', formData.twitch || '');
    
    if (formData.profile_image && formData.profile_image instanceof File) {
      formDataToSend.append('profile_image', formData.profile_image);
    } else if (formData.profile_image === null) {
      formDataToSend.append('clear_profile_image', 'true');
    }

    // Corrigindo o endpoint - removendo a barra extra
    const response = await axios.put('http://localhost:8000/api/v1/players/me/', formDataToSend, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'multipart/form-data'
      }
    });

    setUser(response.data);
    setIsEditing(false);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    if (error.response?.data) {
      setErrors(error.response.data);
    }
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      profile_image: user.profile_image,
      bio: user.bio || '',
      instagram: user.instagram || '',
      x: user.x || '',
      youtube: user.youtube || '',
      twitch: user.twitch || ''
    });
    setIsEditing(false);
    setErrors({});
  };

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
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Perfil</h1>
            
            {/* Informações Pessoais */}
            <div className="bg-[#101010] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Informações Pessoais</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Foto e Info Básica */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={user.profile_image || '/imgs/avatar-m.png'}
                      alt="Foto do perfil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">Membro desde</p>
                    <p className="text-white">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString('pt-BR') : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Informações Principais */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Nome de usuário *
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                            errors.username ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                          }`}
                        />
                      ) : (
                        <p className="text-white text-lg">{user.username}</p>
                      )}
                      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email *
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                          }`}
                        />
                      ) : (
                        <p className="text-white text-lg">{user.email}</p>
                      )}
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                        placeholder="Conte um pouco sobre você..."
                      />
                    ) : (
                      <p className="text-white">{user.bio || 'Nenhuma bio adicionada'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Redes Sociais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Instagram
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                          errors.instagram ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                        }`}
                        placeholder="https://instagram.com/seu_usuario"
                      />
                    ) : (
                      <p className="text-white">
                        {user.instagram ? (
                          <a href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
                            {user.instagram}
                          </a>
                        ) : 'Não informado'}
                      </p>
                    )}
                    {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      X (Twitter)
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="x"
                        value={formData.x}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                          errors.x ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                        }`}
                        placeholder="https://x.com/seu_usuario"
                      />
                    ) : (
                      <p className="text-white">
                        {user.x ? (
                          <a href={user.x} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
                            {user.x}
                          </a>
                        ) : 'Não informado'}
                      </p>
                    )}
                    {errors.x && <p className="text-red-500 text-sm mt-1">{errors.x}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      YouTube
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                          errors.youtube ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                        }`}
                        placeholder="https://youtube.com/@seu_canal"
                      />
                    ) : (
                      <p className="text-white">
                        {user.youtube ? (
                          <a href={user.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
                            {user.youtube}
                          </a>
                        ) : 'Não informado'}
                      </p>
                    )}
                    {errors.youtube && <p className="text-red-500 text-sm mt-1">{errors.youtube}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Twitch
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="twitch"
                        value={formData.twitch}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                          errors.twitch ? 'border-red-500' : 'border-gray-700 focus:border-red-500'
                        }`}
                        placeholder="https://twitch.tv/seu_usuario"
                      />
                    ) : (
                      <p className="text-white">
                        {user.twitch ? (
                          <a href={user.twitch} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
                            {user.twitch}
                          </a>
                        ) : 'Não informado'}
                      </p>
                    )}
                    {errors.twitch && <p className="text-red-500 text-sm mt-1">{errors.twitch}</p>}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-700">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Torneios Participando</h3>
                <p className="text-3xl font-bold text-blue-500">
                  {user.tournaments_participated ? user.tournaments_participated.length : 0}
                </p>
              </div>
              
              <div className="bg-[#101010] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Torneios Criados</h3>
                <p className="text-3xl font-bold text-green-500">
                  {user.torneios_owned ? user.torneios_owned.length : 0}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Perfil;