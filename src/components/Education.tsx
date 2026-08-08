import React, { useState } from 'react';

import { 
  Brain, 
  Heart, 
  Eye, 
  Stethoscope, 
  Shield, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  ChevronRight,
  Play,
  CheckCircle,
  AlertTriangle,
  Activity,
  Microscope,
  Target,
  Clock,
  Lightbulb
} from 'lucide-react';

interface EducationProps {
  onNavigate?: (tab: string) => void;
}

const Education: React.FC<EducationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const diseases = [
    {
      id: 'cancer',
      name: 'Cancer',
      icon: Microscope,
      color: 'from-red-500 to-pink-500',
      earlySymptoms: ['Unusual lumps or swelling', 'Persistent cough', 'Changes in bowel habits', 'Unexplained weight loss'],
      detectionMethods: ['CT Scans', 'MRI Imaging', 'Biopsy Analysis', 'Blood Markers'],
      aiRole: 'AI analyzes medical images to detect abnormal cell patterns and tumor formations up to 2 years before traditional methods.',
      prevention: ['Regular screenings', 'Healthy diet rich in antioxidants', 'Avoid tobacco and excessive alcohol', 'Sun protection'],
      statistics: '90% survival rate when detected early vs 10% when detected late'
    },
    {
      id: 'alzheimers',
      name: "Alzheimer's Disease",
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      earlySymptoms: ['Memory loss affecting daily activities', 'Difficulty planning or solving problems', 'Confusion with time or place', 'Changes in mood or personality'],
      detectionMethods: ['Cognitive Assessments', 'Brain MRI', 'PET Scans', 'Cerebrospinal Fluid Tests'],
      aiRole: 'AI detects subtle changes in brain structure and cognitive patterns through advanced neuroimaging analysis.',
      prevention: ['Regular mental exercise', 'Physical activity', 'Social engagement', 'Mediterranean diet'],
      statistics: 'Early detection can delay nursing home placement by up to 2.5 years'
    },
    {
      id: 'cardiovascular',
      name: 'Cardiovascular Disease',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      earlySymptoms: ['Chest discomfort', 'Shortness of breath', 'Fatigue during normal activities', 'Irregular heartbeat'],
      detectionMethods: ['ECG Analysis', 'Stress Tests', 'Cardiac Imaging', 'Blood Pressure Monitoring'],
      aiRole: 'AI monitors heart rhythm patterns and identifies early signs of cardiac dysfunction through continuous analysis.',
      prevention: ['Regular exercise', 'Heart-healthy diet', 'Stress management', 'No smoking'],
      statistics: '80% of heart disease and stroke cases are preventable through lifestyle changes'
    },
    {
      id: 'diabetes',
      name: 'Type 2 Diabetes',
      icon: Activity,
      color: 'from-blue-500 to-teal-500',
      earlySymptoms: ['Increased thirst and urination', 'Fatigue', 'Blurred vision', 'Slow-healing wounds'],
      detectionMethods: ['Blood Glucose Tests', 'A1C Testing', 'Glucose Tolerance Tests', 'Retinal Screening'],
      aiRole: 'AI analyzes glucose patterns and identifies pre-diabetic conditions through continuous monitoring and risk assessment.',
      prevention: ['Maintain healthy weight', 'Regular physical activity', 'Balanced diet', 'Regular health checkups'],
      statistics: 'Early intervention can prevent or delay Type 2 diabetes by up to 58%'
    }
  ];

  const aiFeatures = [
    {
      icon: Eye,
      title: 'Pattern Recognition',
      description: 'Advanced algorithms identify subtle patterns in medical data that human eyes might miss',
      capability: '99.7% accuracy in image analysis'
    },
    {
      icon: Clock,
      title: 'Early Detection',
      description: 'Detect diseases months or years before traditional methods through predictive modeling',
      capability: 'Up to 3 years earlier detection'
    },
    {
      icon: Target,
      title: 'Precision Medicine',
      description: 'Personalized risk assessment based on individual genetic and lifestyle factors',
      capability: '85% more accurate predictions'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'AI models improve constantly by learning from new medical data and research',
      capability: 'Updated daily with latest research'
    }
  ];

  const preventionTips = [
    {
      category: 'Nutrition',
      icon: Heart,
      tips: [
        'Eat a variety of colorful fruits and vegetables',
        'Choose whole grains over refined carbohydrates',
        'Include lean proteins and healthy fats',
        'Limit processed foods and added sugars'
      ]
    },
    {
      category: 'Physical Activity',
      icon: Activity,
      tips: [
        'Aim for 150 minutes of moderate exercise weekly',
        'Include strength training twice per week',
        'Take regular breaks from sitting',
        'Find activities you enjoy to stay consistent'
      ]
    },
    {
      category: 'Mental Health',
      icon: Brain,
      tips: [
        'Practice stress management techniques',
        'Maintain social connections',
        'Get adequate sleep (7-9 hours)',
        'Engage in mentally stimulating activities'
      ]
    },
    {
      category: 'Screenings',
      icon: Shield,
      tips: [
        'Follow recommended screening schedules',
        'Know your family medical history',
        'Track changes in your body',
        'Discuss concerns with healthcare providers'
      ]
    }
  ];

  const stats = [
    { label: 'Lives Saved', value: '2.5M+', description: 'Through early detection programs' },
    { label: 'Detection Speed', value: '75%', description: 'Faster than traditional methods' },
    { label: 'Accuracy Rate', value: '94.8%', description: 'AI diagnostic accuracy' },
    { label: 'Cost Reduction', value: '60%', description: 'In healthcare expenses' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Health Education
            <span className="block text-blue-600">& Early Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Knowledge is your first line of defense against disease. Learn how AI-powered early detection 
            can save lives and discover the steps you can take to protect your health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate?.('symptoms')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Health Assessment
            </button>
            <button 
              onClick={() => setActiveSection('diseases')}
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Learn About Diseases
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Early Detection Impact</h2>
            <p className="text-lg text-gray-600">The power of early detection in numbers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'diseases', label: 'Diseases', icon: Stethoscope },
              { id: 'ai-technology', label: 'AI Technology', icon: Brain },
              { id: 'prevention', label: 'Prevention', icon: Shield }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeSection === 'overview' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Early Detection Matters</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Early detection of diseases dramatically improves treatment outcomes and saves lives. 
                  When caught early, many serious conditions can be treated more effectively, less invasively, and at a lower cost.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <Award className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Better Outcomes</h3>
                  <p className="text-gray-600">
                    Early-stage diseases are often more treatable, leading to better survival rates and quality of life improvements.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Lower Costs</h3>
                  <p className="text-gray-600">
                    Treating diseases in their early stages is significantly less expensive than advanced-stage treatments.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <Users className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Family Impact</h3>
                  <p className="text-gray-600">
                    Early detection reduces the emotional and financial burden on families and caregivers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'diseases' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major Diseases We Detect</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Learn about the most common serious diseases and how early detection can make a difference.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {diseases.map((disease) => {
                  const Icon = disease.icon;
                  return (
                    <button
                      key={disease.id}
                      onClick={() => setSelectedDisease(disease.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                        selectedDisease === disease.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${disease.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{disease.name}</h3>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {selectedDisease && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  {(() => {
                    const disease = diseases.find(d => d.id === selectedDisease)!;
                    const Icon = disease.icon;
                    return (
                      <div>
                        <div className="flex items-center mb-6">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${disease.color} flex items-center justify-center mr-4`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{disease.name}</h3>
                            <p className="text-gray-600">{disease.statistics}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Early Symptoms</h4>
                            <div className="space-y-2">
                              {disease.earlySymptoms.map((symptom, index) => (
                                <div key={index} className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600">{symptom}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detection Methods</h4>
                            <div className="space-y-2">
                              {disease.detectionMethods.map((method, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600">{method}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">How AI Helps</h4>
                          <p className="text-blue-800">{disease.aiRole}</p>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Prevention Strategies</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {disease.prevention.map((tip, index) => (
                              <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                                <Lightbulb className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {activeSection === 'ai-technology' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How AI Transforms Healthcare</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Artificial Intelligence is revolutionizing early disease detection through advanced pattern recognition, 
                  predictive modeling, and continuous learning capabilities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {aiFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                          <p className="text-blue-600 font-medium">{feature.capability}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Play className="h-12 w-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">See AI in Action</h3>
                    <p className="text-blue-100">Experience how our AI analyzes medical data in real-time</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate?.('imaging')}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Try Image Analysis
                </button>
              </div>
            </div>
          )}

          {activeSection === 'prevention' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Prevention is the Best Medicine</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  While early detection is crucial, prevention remains the most effective strategy. 
                  Learn practical steps you can take today to reduce your risk of serious diseases.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {preventionTips.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                          <Icon className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">{category.category}</h3>
                      </div>
                      <div className="space-y-3">
                        {category.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
                <div className="flex items-start">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-900 mb-3">Important Reminder</h3>
                    <p className="text-yellow-800 leading-relaxed">
                      These prevention strategies are general recommendations. Always consult with your healthcare provider 
                      before making significant changes to your diet, exercise routine, or health management plan. 
                      Individual needs may vary based on personal health history and risk factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Stethoscope className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Take Action for Your Health Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Knowledge without action is just information. Use what you've learned to take control of your health 
            and catch potential issues before they become serious problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate?.('symptoms')}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Symptom Assessment
            </button>
            <button
              onClick={() => onNavigate?.('risk')}
              className="bg-blue-700 hover:bg-blue-800 text-white border-2 border-blue-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Assess Your Risk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;