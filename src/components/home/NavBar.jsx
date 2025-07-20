import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../../public/imgs/logo.png';
import profile from '../../../public/imgs/avatar-m.png'

function NavBar(){
      const [user, setUser] = useState({
    username: '',
    email: '',
    photo: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/player/', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      setUser({
        username: response.data.username,
        email: response.data.email,
        photo: response.data.photo === null ? profile : response.data.photo
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
  }, []);
    return(
        <div><nav className="fixed top-0 z-50 w-full bg-[#121212] border-b border-[#1e1e1e]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg sm:hidden hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
              </button>
              <a href="/home" className="flex ms-2 md:me-24 items-center">
                <img src={logo}className="h-10 me-4" alt="Logo" />
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <button type="button" className="flex text-sm bg-[#1e1e1e] rounded-full focus:ring-4 focus:ring-gray-600">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={user.photo} alt="User" />
                </button>
                <div className="hidden z-50 my-4 text-base list-none bg-[#1e1e1e] divide-y divide-gray-600 rounded-md shadow">
                  <div className="px-4 py-3">
                    <p className="text-sm text-white">{user.username}</p>
                    <p className="text-sm font-medium text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>   
            </div>

          </div>
        </div>
      </nav></div>
    )
              
}

export default NavBar;