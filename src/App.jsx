import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EmailConfirmPage from './pages/EmailConfirmPage';
import EnablePermissionPage from './pages/EnablePermissionPage';
import PlusUnlockedPage from './pages/PlusUnlockedPage';
import SubscriptionPlansPage from './pages/SubscriptionPlansPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          
          {/* Welcome page */}
          <Route path="/welcome" element={<WelcomePage />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Register page */}
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Email confirmation page */}
          <Route path="/email-confirm" element={<EmailConfirmPage />} />
          
                  {/* Enable permission page */}
        <Route path="/enable-permission" element={<EnablePermissionPage />} />
        
        {/* Plus unlocked page */}
        <Route path="/plus-unlocked" element={<PlusUnlockedPage />} />
        
        {/* Subscription plans page */}
        <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
        
        {/* Catch all route - redirect to welcome */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;