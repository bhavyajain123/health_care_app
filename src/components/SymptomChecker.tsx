import React, { useState } from 'react';
import { Plus, X, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { SymptomData, DiagnosticResult } from '../types/medical';
import { analyzeSymptoms } from '../utils/aiSimulation';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState<SymptomData[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [currentDuration, setCurrentDuration] = useState('');
  const [currentFrequency, setCurrentFrequency] = useState('');
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    'Headache', 'Fatigue', 'Chest pain', 'Shortness of breath', 'Nausea',
    'Dizziness', 'Muscle pain', 'Joint pain', 'Fever', 'Cough',
    'Memory loss', 'Confusion', 'Blurred vision', 'Unusual moles'
  ];

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      const newSymptom: SymptomData = {
        id: `symptom-${Date.now()}`,
        symptom: currentSymptom,
        severity: currentSeverity,
        duration: currentDuration,
        frequency: currentFrequency
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom('');
      setCurrentDuration('');
      setCurrentFrequency('');
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const analyzeAllSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResults = analyzeSymptoms(symptoms);
    setResults(analysisResults);
    setIsAnalyzing(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'critical': return 'text-red-800 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'urgent': return <Clock className="h-5 w-5 text-orange-600" />;
      case 'soon': return <Zap className="h-5 w-5 text-yellow-600" />;
      default: return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Symptom Checker</h1>
        <p className="text-lg text-gray-600">
          Describe your symptoms and get AI-powered insights for early disease detection
        </p>
      </div>

      {/* Symptom Input */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Your Symptoms</h2>
        
        {/* Quick Symptom Buttons */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Common symptoms (click to add):</p>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => setCurrentSymptom(symptom)}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symptom</label>
            <input
              type="text"
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="Describe your symptom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={currentSeverity}
              onChange={(e) => setCurrentSeverity(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={currentDuration}
              onChange={(e) => setCurrentDuration(e.target.value)}
              placeholder="e.g., 3 days"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <input
              type="text"
              value={currentFrequency}
              onChange={(e) => setCurrentFrequency(e.target.value)}
              placeholder="e.g., Daily"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={addSymptom}
          disabled={!currentSymptom.trim()}
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Symptom
        </button>
      </div>

      {/* Current Symptoms */}
      {symptoms.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Symptoms</h2>
          <div className="space-y-4 mb-6">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{symptom.symptom}</div>
                  <div className="text-sm text-gray-600">
                    {symptom.severity} severity • {symptom.duration} • {symptom.frequency}
                  </div>
                </div>
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={analyzeAllSymptoms}
            disabled={isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Analyzing Symptoms...
              </div>
            ) : (
              'Analyze with AI'
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">AI Diagnostic Results</h2>
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.condition}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-sm text-gray-600">
                      Confidence: {result.confidence}%
                    </span>
                    <div className="flex items-center gap-1">
                      {getUrgencyIcon(result.urgency)}
                      <span className="text-sm text-gray-600 capitalize">{result.urgency}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Matching Symptoms</h4>
                  <ul className="space-y-2">
                    {result.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Please consult with a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;