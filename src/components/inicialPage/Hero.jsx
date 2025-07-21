import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {

    const highlightText = (text, highlights) => {
        let result = text;
        highlights.forEach(highlight => {
            result = result.replace(
                highlight,
                `<span class="text-red-500 font-semibold">${highlight}</span>`
            );
        });
        return result;
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
            <div className="grid max-w-screen-xl mx-auto gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <h1 className="mb-6 text-center lg:text-left text-5xl font-extrabold leading-tight text-white">
                        <span className="text-gray-300">Bem-vindo ao</span><br />
                        <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                            E-Playoffs
                        </span>
                    </h1>

                    <p 
                        className="mb-8 text-justify text-gray-300 md:text-lg lg:text-xl leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: highlightText(
                                "O E-Playoffs é uma plataforma inovadora destinada à comunidade de jogos eletrônicos, com foco na competição. Gerencie torneios de CS:GO, Valorant, League Of Legends, FIFA, Dragon Ball FighterZ e muito mais.",
                                ["E-Playoffs", "CS:GO", "Valorant", "League Of Legends", "FIFA", "Dragon Ball FighterZ"]
                            )
                        }}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/cadastro">
                            <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-colors">
                                Começar Agora
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-gray-600 hover:border-red-500 rounded-xl transition-colors">
                                Entrar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
