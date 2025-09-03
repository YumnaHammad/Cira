import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'lucide-react';
import logo from '../assets/Logo.png';
import loginLogo from '../assets/LoginLogo.png';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div
            className="min-h-screen flex flex-col px-6 py-8 overflow-hidden relative"
            style={{ background: 'linear-gradient(180deg, #FFFBFD 0%, #FDE4F8 28%, #FFF7EA 100%)' }}
        >
            {/* Header - Logo in top left */}
            <div className="w-full flex justify-start items-center mb-4">
                <div className="flex items-center pl-8">
                    <img src={logo} alt="Cira Logo" className="h-10 w-auto" />
                </div>
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm text-center">
                    {/* Main Logo */}
                    <div className="flex justify-center mb-4">
                        <img
                            src={loginLogo}
                            alt="Login Logo"
                            className="w-28 h-28"
                        />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                        Smart AI Companion for Anytime Assistance
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 text-base mb-10 leading-relaxed">
                        Your smart AI companion, ready to assist with answers, advice, and inspiration, keeping you informed and engaged anytime, anywhere you go.
                    </p>

                    {/* Feature Cards */}
                    <div className="space-y-4 mb-12">
                        {/* Card 1: Instant Answers */}
                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-5">
                                <div className="w-9 h-9 bg-pink-500 rounded-3xl flex items-center justify-center flex-shrink-0 ml-2">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Instant Answers</h3>
                                    <p className="text-gray-600 text-sm">Get quick, accurate responses to your questions in real-time.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Personalized Advice */}
                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-5">
                                <div className="w-9 h-9 bg-pink-500 rounded-3xl flex items-center justify-center flex-shrink-0 ml-2">
                                    <Link className="w-5 h-5 text-white " />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Personalized Advice</h3>
                                    <p className="text-gray-600 text-sm">Receive tailored insights and advice based on your preferences and needs.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Inspiration Anytime */}
                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-5">
                                <div className="w-9 h-9 bg-pink-500 rounded-3xl flex items-center justify-center flex-shrink-0 ml-2">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="3" />
                                        <circle cx="12" cy="5" r="2" />
                                        <circle cx="12" cy="19" r="2" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Inspiration Anytime</h3>
                                    <p className="text-gray-600 text-sm">Find fresh ideas, motivation, and creative solutions whenever you need them.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        {/* Login Button */}
                        <button
                            onClick={() => navigate('/login')}
                            className="flex-1 py-3 px-6 rounded-3xl font-semibold text-base border-2 border-pink-500 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                        >
                            Login
                        </button>

                        {/* Register Button */}
                        <button
                            onClick={() => navigate('/register')}
                            className="flex-1 py-3 px-6 rounded-3xl font-semibold text-base bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 transform active:scale-95 transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
