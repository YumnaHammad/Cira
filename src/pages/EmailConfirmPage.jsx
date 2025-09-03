import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLogo from '../assets/LoginLogo.png';
import logo from '../assets/Logo.png';

const EmailConfirmPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['1', '2', '5', '0']);
  const [countdown, setCountdown] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Auto-focus next input
  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  // Validate and submit code
  const handleContinue = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 4-digit code
      if (fullCode.length === 4) {
        navigate('/enable-permission');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code
  const handleResend = () => {
    setCountdown(10);
    setCanResend(false);
    setCode(['1', '2', '5', '0']);
    setError('');
    inputRefs.current[0]?.focus();
    
    // Simulate resending code
    console.log('Resending verification code...');
  };

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center px-6 py-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFBFD 0%, #FDE4F8 28%, #FFF7EA 100%)' }}
    >
      {/* Header - Fixed at top */}
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex items-center pl-8">
          <img src={logo} alt="Cira Logo" className="h-10 w-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Logo */}
        <div className="mb-3">
          <img 
            src={LoginLogo} 
            alt="Cira Logo" 
            className="w-28 h-28 mb-3"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Confirm your Email
        </h1>

        {/* Instructions */}
        <p className="text-gray-600 text-center mb-4 leading-relaxed">
          Please enter the 4-digit code we sent to your email to continue
        </p>

        {/* Code Input Fields */}
        <div className="flex gap-3 mb-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Resend Code */}
        <div className="mb-20">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-gray-500 text-sm">
              Resend in {countdown}s
            </p>
          )}
        </div>

                 {/* Continue Button */}
         <button
           onClick={handleContinue}
           disabled={isLoading || code.join('').length !== 4}
           className={`w-full py-3 rounded-3xl font-semibold text-lg transition-all duration-200 ${
             isLoading || code.join('').length !== 4
               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
               : 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 transform active:scale-95'
           }`}
         >
           {isLoading ? (
             <div className="flex items-center justify-center">
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
               Verifying...
             </div>
           ) : (
             'Countinue'
           )}
         </button>
      </div>
    </div>
  );
};

export default EmailConfirmPage;
