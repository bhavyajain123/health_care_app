export interface SymptomData {
  id: string;
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  frequency: string;
}

export interface RiskFactor {
  id: string;
  factor: string;
  value: string | number | boolean;
  weight: number;
}

export interface DiagnosticResult {
  id: string;
  condition: string;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  symptoms: string[];
  recommendations: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'immediate';
  date: string;
}

export interface ImageAnalysis {
  id: string;
  fileName: string;
  analysisType: 'chest-xray' | 'mri' | 'ct-scan' | 'dermatology' | 'retinal';
  findings: string[];
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  recommendations: string[];
  date: string;
}

export interface UserProfile {
  id: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  familyHistory: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: string;
    exercise: string;
    diet: string;
  };
}