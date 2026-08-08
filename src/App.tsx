import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SymptomChecker from './components/SymptomChecker';
import ImageAnalysis from './components/ImageAnalysis';
import RiskAssessment from './components/RiskAssessment';
import Dashboard from './components/Dashboard';
import Education from './components/Education';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'imaging':
        return <ImageAnalysis />;
      case 'risk':
        return <RiskAssessment />;
      case 'dashboard':
        return <Dashboard />;
      case 'education':
        return <Education onNavigate={setActiveTab} />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;