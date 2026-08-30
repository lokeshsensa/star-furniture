import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StarLogoIntro } from './components/StarLogoIntro/StarLogoIntro';
import { HomePage } from './pages/HomePage';
import { IntroPage } from './pages/IntroPage';

const MainLayout: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <div className="relative min-h-screen bg-white">
      {showIntro && (
        <StarLogoIntro onComplete={() => setShowIntro(false)} />
      )}
      <HomePage />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
