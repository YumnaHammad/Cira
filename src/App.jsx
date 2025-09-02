import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'register'

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginPage onNavigate={navigateToPage} />
      ) : (
        <RegisterPage onNavigate={navigateToPage} />
      )}
    </div>
  );
}

export default App;