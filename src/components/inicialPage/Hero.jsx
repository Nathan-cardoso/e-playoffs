import React from 'react'
import logo from '../../../public/imgs/logo.png';

function Hero() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <section className="bg-white dark:bg-black w-full">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-center text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Bem-vindo</h1>
                        <p className="max-w-2xl mb-6 font-normal text-justify text-gray-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">O <span className="text-red-600"><em>E-Playoffs</em></span> é uma ideia de projeto destinado a comunidade de jogos eletrônicos, especialmente, com foco na parte competitiva. O objetivo geral do projeto é criar um sistema que possa gerenciar torneios de diversos jogos competitivos como: <span className="text-red-600">CS</span>, <span className="text-red-600">Valorant</span>, <span className="text-red-600">League Of Legends</span>, <span className="text-red-600">Wild Rift</span>, <span className="text-red-600">PUBG</span> entre outros. O E-Playoffs tem em seu princípio incentivar o cenário competitivo dos esportes eletrônicos, tentando proporcionar uma experiência agradável e acolhedora para jogadores casuais.</p> 
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={logo} alt="Logo da E-playoffs" className="w-auto h-auto" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;
