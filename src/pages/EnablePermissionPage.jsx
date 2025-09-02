import React from 'react';
import LoginLogo from '../assets/LoginLogo.png';
import logo from '../assets/Logo.png';

const EnablePermissionPage = ({ onBack, onContinue }) => {
  const handleEnablePermissions = () => {
    // Simulate enabling permissions
    console.log('Enabling permissions');
    onContinue();
  };

  const permissionCards = [
    {
      id: 'notification',
      title: 'Notification Access',
      description: 'Allow access to enhance functionality and improve experience',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      )
    },
    {
      id: 'calendar',
      title: 'Calendar Access',
      description: 'Allow access to enhance functionality and improve experience',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    {
      id: 'location',
      title: 'Location Access',
      description: 'Allow access to enhance functionality and improve experience',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    },
    {
      id: 'gallery',
      title: 'Gallery or File Access',
      description: 'Allow access to enhance functionality and improve experience',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      )
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col px-6 py-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFBFD 0%, #FDE4F8 28%, #FFF7EA 100%)' }}
    >
      {/* Header - Fixed at top */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center pl-8">
          <img src={logo} alt="Cira Logo" className="h-10 w-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src={LoginLogo} 
              alt="Cira Logo" 
              className="w-28 h-28 mb-3 mx-auto"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Enable Permission
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Allow access to enhance functionality and improve experience
          </p>

          {/* Permission Cards */}
          <div className="space-y-2 mb-8">
            {permissionCards.map((card) => (
              <div
                key={card.id}
                className={`${card.id === 'calendar' ? 'bg-transparent border-0' : 'bg-white/40 border border-gray-100'} rounded-2xl p-3 shadow-sm flex items-start gap-4`}
              >
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enable Permission Button */}
          <button
            onClick={handleEnablePermissions}
            className="w-full py-3 bg-pink-500 text-white rounded-3xl font-semibold text-lg hover:bg-pink-600 active:bg-pink-700 transform active:scale-95 transition-all duration-200"
          >
            Enable Permission
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnablePermissionPage;
