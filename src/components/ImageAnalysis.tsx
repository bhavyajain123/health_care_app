import React, { useState, useRef } from 'react';
import { Upload, Camera, FileImage, AlertTriangle, CheckCircle, Download, Share } from 'lucide-react';
import { ImageAnalysis as ImageAnalysisType } from '../types/medical';
import { analyzeImage } from '../utils/aiSimulation';

const ImageAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<string>('chest-xray');
  const [analysis, setAnalysis] = useState<ImageAnalysisType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analysisTypes = [
    { value: 'chest-xray', label: 'Chest X-Ray', description: 'Lung and heart analysis' },
    { value: 'mri', label: 'MRI Scan', description: 'Soft tissue and organ imaging' },
    { value: 'ct-scan', label: 'CT Scan', description: 'Cross-sectional imaging' },
    { value: 'dermatology', label: 'Skin Lesion', description: 'Skin cancer screening' },
    { value: 'retinal', label: 'Retinal Scan', description: 'Eye disease detection' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      setAnalysis(null);
    } else {
      alert('Please select a valid image file');
    }
  };

  const analyzeSelectedImage = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result = analyzeImage(selectedFile.name, analysisType);
    setAnalysis(result);
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical Image Analysis</h1>
        <p className="text-lg text-gray-600">
          Upload medical images for AI-powered analysis and early disease detection
        </p>
      </div>

      {/* Analysis Type Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Analysis Type</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {analysisTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setAnalysisType(type.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                analysisType === type.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="font-medium mb-1">{type.label}</div>
              <div className="text-xs text-gray-500">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Medical Image</h2>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your medical image here, or click to browse
              </p>
              <p className="text-gray-500">
                Supports JPEG, PNG, and other common image formats
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FileImage className="h-4 w-4 mr-2" />
                Choose File
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </button>
            </div>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {analysisTypes.find(t => t.value === analysisType)?.label}
                </p>
              </div>
              <button
                onClick={analyzeSelectedImage}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{analysis.confidence}%</div>
              <div className="text-gray-600">Confidence Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-sm font-medium px-3 py-1 rounded-full border inline-block ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel.toUpperCase()}
              </div>
              <div className="text-gray-600 mt-2">Risk Level</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {analysisTypes.find(t => t.value === analysis.analysisType)?.label}
              </div>
              <div className="text-gray-600">Analysis Type</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h3>
              <div className="space-y-3">
                {analysis.findings.map((finding, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Important Medical Disclaimer</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  This AI analysis is designed to assist healthcare professionals and should not be used as a substitute for professional medical diagnosis. 
                  The results are based on pattern recognition and should always be validated by qualified medical personnel. 
                  Please consult with your healthcare provider to discuss these findings and determine appropriate next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;