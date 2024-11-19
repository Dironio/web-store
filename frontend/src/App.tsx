import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';


const App: React.FC = () => {
  const isAuthenticated = false; // Замените на проверку из контекста


  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/auth" element={<AuthPage />} />
        <Route path="/products/:id" element={<ProductPage />} /> */}
        <Route
          path="/settings"
        // element={isAuthenticated ? <SettingsPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
};


export default App;