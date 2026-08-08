import React from 'react';
import { Activity, Shield, Brain, Zap, Users, Award } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze symptoms and medical images for early disease detection.',
      action: () => onNavigate('symptoms')
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk evaluation based on personal and family medical history.',
      action: () => onNavigate('risk')
    },
    {
      icon: Activity,
      title: 'Symptom Tracking',
      description: 'Intelligent symptom checker that identifies potential health concerns early.',
      action: () => onNavigate('symptoms')
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate diagnostic insights with confidence scores and recommendations.',
      action: () => onNavigate('imaging')
    }
  ];

  const stats = [
    { label: 'Conditions Analyzed', value: '150+' },
    { label: 'Accuracy Rate', value: '94.7%' },
    { label: 'Users Helped', value: '50K+' },
    { label: 'Early Detections', value: '12K+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Early Disease Detection
              <span className="block text-blue-600">Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary diagnostic platform that uses artificial intelligence to detect diseases 
              like cancer, Alzheimer's, and cardiovascular conditions in their earliest stages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('symptoms')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Diagnosis
              </button>
              <button
                onClick={() => onNavigate('education')}
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Diagnostic Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI platform combines multiple diagnostic approaches for comprehensive health assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={feature.action}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Take Control of Your Health Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Early detection saves lives. Our AI-powered platform helps identify potential health issues 
            before they become serious problems.
          </p>
          <button
            onClick={() => onNavigate('symptoms')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Begin Health Assessment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;