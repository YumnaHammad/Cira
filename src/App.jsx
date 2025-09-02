import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EmailConfirmPage from './pages/EmailConfirmPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', or 'email-confirm'

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('email-confirm');
  };

  const handleEmailConfirmSuccess = () => {
    // Navigate to dashboard or success page
    alert('Email confirmed successfully! Welcome to Cira!');
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginPage onNavigate={navigateToPage} />
      ) : currentPage === 'register' ? (
        <RegisterPage onNavigate={navigateToPage} onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (
        <EmailConfirmPage 
          onBack={() => setCurrentPage('register')} 
          onContinue={handleEmailConfirmSuccess}
        />
      )}
    </div>
  );
}

export default App;