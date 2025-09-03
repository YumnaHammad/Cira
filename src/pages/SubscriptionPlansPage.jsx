import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import loginLogo from '../assets/LoginLogo.png';

const SubscriptionPlansPage = () => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        // Navigate to login page after upgrade
        navigate('/login');
    };

    const subscriptionPlans = [
        {
            id: 'basic',
            title: 'Basic Plan',
            description: 'Perfect for personal use with basic features and 100 monthly messages.',
            price: '$9.99/month',
            isPopular: true
        },
        {
            id: 'pro',
            title: 'Pro Plan',
            description: 'Designed for small businesses with team features, analytics, and 500 messages per month.',
            price: '$29.99/month',
            isPopular: false
        },
        {
            id: 'enterprise',
            title: 'Enterprise Plan',
            description: 'Built for teams and organizations, including team collaboration tools, analytics, priority support, and 1,000 monthly messages.',
            price: '$49.99/month',
            isPopular: false
        }
    ];

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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        Get Chatia Plus Subscriptions
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        Allow access to enhance your experience and unlock all features.
                    </p>

                                         {/* Subscription Plans */}
                     <div className="space-y-2 mb-4">
                         {subscriptionPlans.map((plan) => (
                             <div
                                 key={plan.id}
                                 className="bg-white rounded-3xl p-4  shadow-sm border border-gray-100 relative"
                             >
                                 {/* Popular Badge */}
                                 {plan.isPopular && (
                                     <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                         Popular
                                     </div>
                                 )}
                                 
                                 <div className="text-left">
                                     <h1 className="font-semibold text-gray-900 mb-2 text-xl">{plan.title}</h1>
                                     <p className="text-gray-600 text-sm mb-3" style={{ lineHeight: '1.4' }}>{plan.description}</p>
                                     <div className="text-pink-500 font-bold text-xl ">{plan.price}</div>
                                 </div>
                             </div>
                         ))}
                     </div>

                    {/* Upgrade Button */}
                    <button
                        onClick={handleUpgrade}
                        className="w-full py-3 px-6 rounded-3xl font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 transform active:scale-95 transition-all duration-200 shadow-lg"
                    >
                        Upgrade to Plus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlansPage;
