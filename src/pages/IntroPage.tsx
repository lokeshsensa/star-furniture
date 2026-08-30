import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarLogoIntro } from '../components/StarLogoIntro/StarLogoIntro';

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] overflow-hidden">
      {/* Existing STAR Furniture Logo Reveal Intro */}
      <StarLogoIntro onComplete={handleComplete} />
    </div>
  );
};

export default IntroPage;
