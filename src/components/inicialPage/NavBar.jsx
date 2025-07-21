import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="fixed w-full z-50 top-0 bg-black/90 backdrop-blur-md border-b border-red-600/20">
            <div className="max-w-screen-xl flex items-center justify-end mx-auto p-4 space-x-4">
                <Link to="/login">
                    <button className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm px-6 py-2 transition-colors">
                        Entrar
                    </button>
                </Link>

                <Link to="/cadastro">
                    <button className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-sm px-6 py-2 transition-colors">
                        Cadastre-se
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
