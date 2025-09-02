import React, { useState } from 'react';
import logo from '../assets/Logo.png';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-50 flex flex-col px-4 py-8 overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img src={logo} alt="Cira Logo" className="h-8 w-auto" />
        </div>
     
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm text-center">
          {/* Profile Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full border-2 border-pink-200 flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">C</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-pink-200 shadow-sm">
                <span className="text-pink-500 font-bold text-xs">+</span>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create new account
          </h1>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange('username')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Phone Number */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                <span className="text-gray-500 text-sm font-medium">+1</span>
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                className="w-full px-4 py-3 pl-16 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Register Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
              </button>
            </div>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Login
              </button>
            </p>
            <div className="mt-3 w-8 h-1 bg-gray-300 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
