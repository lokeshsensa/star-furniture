import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IntroPage } from './pages/IntroPage';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page 1: Logo Intro — /intro */}
        <Route path="/intro" element={<IntroPage />} />

        {/* Page 2: Main Website — / */}
        <Route path="/" element={<HomePage />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/intro" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
