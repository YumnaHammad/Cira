import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EmailConfirmPage from './pages/EmailConfirmPage';
import EnablePermissionPage from './pages/EnablePermissionPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', 'email-confirm', or 'enable-permission'

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('email-confirm');
  };

  const handleEmailConfirmSuccess = () => {
    // Navigate to enable permission page
    setCurrentPage('enable-permission');
  };

  const handlePermissionSuccess = () => {
    // Navigate to dashboard or success page
    alert('Permissions enabled successfully! Welcome to Cira!');
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginPage onNavigate={navigateToPage} />
      ) : currentPage === 'register' ? (
        <RegisterPage onNavigate={navigateToPage} onRegistrationSuccess={handleRegistrationSuccess} />
      ) : currentPage === 'email-confirm' ? (
        <EmailConfirmPage 
          onBack={() => setCurrentPage('register')} 
          onContinue={handleEmailConfirmSuccess}
        />
      ) : (
        <EnablePermissionPage
          onBack={() => setCurrentPage('email-confirm')}
          onContinue={handlePermissionSuccess}
        />
      )}
    </div>
  );
}

export default App;