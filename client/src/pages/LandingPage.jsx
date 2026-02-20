import React from 'react';
import { useNavigate } from 'react-router-dom';
import SaarthiLogo from '../components/SaarthiLogo';
import assets from '../assets/assets';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col pt-10 px-8 sm:px-16" style={{ backgroundImage: `url(${assets.bgImage})` }}>
            {/* Header Navigation */}
            <nav className="w-full flex items-center justify-between pb-10">
                <SaarthiLogo size="normal" />
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-white font-medium hover:text-violet-400 transition-colors cursor-pointer"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-indigo-500/30"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 pb-20 mt-10">

                {/* Left Content */}
                <div className="flex-1 flex flex-col text-center md:text-left text-white max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Connect with the world, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">seamlessly.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                        Experience lightning-fast communication with Saarthi. Your own private, secure, and beautifully designed messenger. Stay close to the people that matter.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-[#282142] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl cursor-pointer"
                        >
                            Start Chatting Now
                        </button>
                    </div>

                    {/* Features Mini Section */}
                    <div className="grid grid-cols-3 gap-6 mt-16 text-left opacity-80">
                        <div>
                            <h3 className="font-bold text-xl text-violet-300 mb-1">⚡ Fast</h3>
                            <p className="text-sm font-light text-gray-400">Real-time Socket connection</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-cyan-300 mb-1">🔒 Secure</h3>
                            <p className="text-sm font-light text-gray-400">JWT Authenticated</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-indigo-300 mb-1">✨ Design</h3>
                            <p className="text-sm font-light text-gray-400">Premium Cyber-Cyan UI</p>
                        </div>
                    </div>
                </div>

                {/* Right Image/Graphic */}
                <div className="flex-1 w-full flex justify-center mt-10 md:mt-0 relative">
                    {/* Decorative blurred background shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="z-10 animate-gentle-bounce drop-shadow-[0_0_40px_rgba(139,92,246,0.5)] flex flex-col items-center mt-4 md:-mt-16 lg:-mt-24 xl:-mt-32">
                        <img
                            src={assets.logo_big}
                            alt="Saarthi Messenger"
                            className="w-[60%] sm:w-[70%] md:w-[80%] max-w-[350px] object-contain"
                        />
                        <div className="flex flex-col items-center mt-6">
                            <span className="font-bold tracking-wide text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300">
                                Saarthi
                            </span>
                            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 tracking-widest uppercase font-medium mt-2">
                                Your Own Messenger
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
