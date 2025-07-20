import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function Home() {
  const token = localStorage.getItem('access_token'); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div>
      <NavBar />
      <Sidebar />
    </div>
  );
}

export default Home;
