import React, { useState } from 'react';
import { Heart, User, Calendar, Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { RiskFactor, UserProfile } from '../types/medical';
import { calculateRiskScore } from '../utils/aiSimulation';

const RiskAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    age: 0,
    gender: '',
    medicalHistory: [],
    familyHistory: [],
    lifestyle: {
      smoking: false,
      alcohol: 'none',
      exercise: 'none',
      diet: 'average'
    }
  });
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [riskScore, setRiskScore] = useState<number | null>(null);

  const medicalConditions = [
    'Hypertension', 'Diabetes', 'Heart Disease', 'Stroke', 'Cancer',
    'Asthma', 'Arthritis', 'Depression', 'Anxiety', 'Kidney Disease'
  ];

  const familyConditions = [
    'Heart Disease', 'Cancer', 'Diabetes', 'Alzheimer\'s', 'Stroke',
    'High Blood Pressure', 'Mental Health Issues', 'Autoimmune Diseases'
  ];

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateLifestyle = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle!,
        [field]: value
      }
    }));
  };

  const toggleCondition = (conditions: string[], condition: string, field: 'medicalHistory' | 'familyHistory') => {
    const updated = conditions.includes(condition)
      ? conditions.filter(c => c !== condition)
      : [...conditions, condition];
    updateProfile(field, updated);
  };

  const calculateFinalRisk = () => {
    const factors: RiskFactor[] = [
      { id: 'age', factor: 'Age', value: profile.age! > 65 ? 1 : profile.age! > 45 ? 0.5 : 0, weight: 2 },
      { id: 'smoking', factor: 'Smoking', value: profile.lifestyle?.smoking ? 1 : 0, weight: 3 },
      { id: 'exercise', factor: 'Exercise', value: profile.lifestyle?.exercise === 'none' ? 1 : profile.lifestyle?.exercise === 'light' ? 0.5 : 0, weight: 2 },
      { id: 'medical', factor: 'Medical History', value: profile.medicalHistory!.length > 2 ? 1 : profile.medicalHistory!.length > 0 ? 0.5 : 0, weight: 3 },
      { id: 'family', factor: 'Family History', value: profile.familyHistory!.length > 2 ? 1 : profile.familyHistory!.length > 0 ? 0.5 : 0, weight: 2 }
    ];

    setRiskFactors(factors);
    const score = calculateRiskScore(factors);
    setRiskScore(score);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Critical', color: 'text-red-800 bg-red-100', description: 'Immediate medical attention recommended' };
    if (score >= 60) return { level: 'High', color: 'text-red-600 bg-red-50', description: 'Regular monitoring and lifestyle changes needed' };
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-50', description: 'Some risk factors present, consider prevention strategies' };
    return { level: 'Low', color: 'text-green-600 bg-green-50', description: 'Maintain current healthy practices' };
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateFinalRisk();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Basic demographic information for risk assessment</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={profile.gender || ''}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Medical History</h2>
              <p className="text-gray-600">Select any conditions you have been diagnosed with</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {medicalConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleCondition(profile.medicalHistory || [], condition, 'medicalHistory')}
                  className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    profile.medicalHistory?.includes(condition)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {profile.medicalHistory?.includes(condition) && (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    {condition}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Family History</h2>
              <p className="text-gray-600">Select conditions that run in your family</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {familyConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleCondition(profile.familyHistory || [], condition, 'familyHistory')}
                  className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    profile.familyHistory?.includes(condition)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {profile.familyHistory?.includes(condition) && (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    {condition}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Lifestyle Factors</h2>
              <p className="text-gray-600">Information about your daily habits and lifestyle</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you smoke?</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateLifestyle('smoking', false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                      !profile.lifestyle?.smoking
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    No
                  </button>
                  <button
                    onClick={() => updateLifestyle('smoking', true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                      profile.lifestyle?.smoking
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Exercise Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['none', 'light', 'regular'].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateLifestyle('exercise', level)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 capitalize ${
                        profile.lifestyle?.exercise === level
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Diet Quality</label>
                <div className="grid grid-cols-3 gap-3">
                  {['poor', 'average', 'healthy'].map((diet) => (
                    <button
                      key={diet}
                      onClick={() => updateLifestyle('diet', diet)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 capitalize ${
                        profile.lifestyle?.diet === diet
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (riskScore !== null) {
    const risk = getRiskLevel(riskScore);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Risk Assessment</h1>
          
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{riskScore}%</div>
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${risk.color}`}>
              {risk.level} Risk
            </div>
            <p className="text-gray-600 mt-2">{risk.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors Analyzed</h3>
              <div className="space-y-3">
                {riskFactors.map((factor) => (
                  <div key={factor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{factor.factor}</span>
                    <span className="font-medium text-gray-900">
                      {typeof factor.value === 'boolean' ? (factor.value ? 'Yes' : 'No') : 
                       typeof factor.value === 'number' ? `${Math.round(factor.value * 100)}%` : factor.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Schedule regular health check-ups</span>
                </div>
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Maintain a healthy lifestyle</span>
                </div>
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Monitor key health indicators</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              This assessment provides general risk insights and should not replace professional medical advice. 
              Consult your healthcare provider for personalized health recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Health Risk Assessment</h1>
          <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            {currentStep === 4 ? 'Calculate Risk' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;