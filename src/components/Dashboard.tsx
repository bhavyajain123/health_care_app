import React, { useState } from 'react';
import { BarChart3, Calendar, TrendingUp, AlertTriangle, FileText, Download, Eye } from 'lucide-react';
import { DiagnosticResult, ImageAnalysis } from '../types/medical';

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for demonstration
  const mockResults: DiagnosticResult[] = [
    {
      id: '1',
      condition: 'Early Stage Cardiovascular Disease',
      confidence: 87,
      riskLevel: 'high',
      symptoms: ['Chest pain', 'Shortness of breath'],
      recommendations: ['Cardiology consultation', 'Stress test'],
      urgency: 'urgent',
      date: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      condition: 'Type 2 Diabetes Risk',
      confidence: 73,
      riskLevel: 'moderate',
      symptoms: ['Excessive thirst', 'Fatigue'],
      recommendations: ['Blood sugar monitoring', 'Diet modification'],
      urgency: 'soon',
      date: '2024-01-10T14:20:00Z'
    }
  ];

  const mockImageAnalyses: ImageAnalysis[] = [
    {
      id: '1',
      fileName: 'chest_xray_2024_01_12.jpg',
      analysisType: 'chest-xray',
      findings: ['Lung opacity detected', 'Heart size normal'],
      confidence: 92,
      riskLevel: 'moderate',
      recommendations: ['Follow-up CT scan', 'Pulmonologist consultation'],
      date: '2024-01-12T09:15:00Z'
    }
  ];

  const stats = [
    { label: 'Total Assessments', value: '12', change: '+3 this month', color: 'text-blue-600' },
    { label: 'High Risk Findings', value: '2', change: 'Needs attention', color: 'text-red-600' },
    { label: 'Images Analyzed', value: '8', change: '+2 this week', color: 'text-green-600' },
    { label: 'Recommendations', value: '15', change: '5 pending', color: 'text-yellow-600' }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'critical': return 'text-red-800 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-800 bg-red-100';
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'soon': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredResults = mockResults.filter(result => {
    if (activeFilter === 'all') return true;
    return result.riskLevel === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your health assessments and track progress over time</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Level Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Level Overview</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {['low', 'moderate', 'high', 'critical'].map((level) => {
            const count = mockResults.filter(r => r.riskLevel === level).length;
            return (
              <div key={level} className={`p-4 rounded-lg border ${getRiskColor(level)}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{count}</div>
                  <div className="text-sm capitalize">{level} Risk</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Assessments</h2>
          <div className="flex gap-2">
            {['all', 'high', 'moderate', 'low'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 capitalize ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter} {filter !== 'all' && 'Risk'}
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Results */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{result.condition}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(result.urgency)}`}>
                      {result.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Confidence: {result.confidence}% • {formatDate(result.date)}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.symptoms.slice(0, 2).map((symptom, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {symptom}
                      </span>
                    ))}
                    {result.symptoms.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{result.symptoms.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Analysis Results */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Image Analyses</h2>
        <div className="space-y-4">
          {mockImageAnalyses.map((analysis) => (
            <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{analysis.fileName}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(analysis.riskLevel)}`}>
                      {analysis.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {analysis.analysisType.replace('-', ' ').toUpperCase()} • Confidence: {analysis.confidence}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(analysis.date)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-all duration-200">
            <Calendar className="h-8 w-8 mb-2" />
            <div className="font-medium">Schedule Appointment</div>
            <div className="text-sm opacity-90">Book with healthcare provider</div>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-all duration-200">
            <TrendingUp className="h-8 w-8 mb-2" />
            <div className="font-medium">New Assessment</div>
            <div className="text-sm opacity-90">Start symptom checker</div>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-all duration-200">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <div className="font-medium">View Alerts</div>
            <div className="text-sm opacity-90">Check urgent notifications</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;