import { SymptomData, RiskFactor, DiagnosticResult, ImageAnalysis } from '../types/medical';

export const analyzeSymptoms = (symptoms: SymptomData[]): DiagnosticResult[] => {
  // Simulate AI analysis with realistic medical conditions
  const conditions = [
    {
      condition: 'Early Stage Cardiovascular Disease',
      keywords: ['chest pain', 'shortness of breath', 'fatigue', 'irregular heartbeat'],
      riskFactors: ['smoking', 'high blood pressure', 'family history']
    },
    {
      condition: 'Type 2 Diabetes Risk',
      keywords: ['excessive thirst', 'frequent urination', 'fatigue', 'blurred vision'],
      riskFactors: ['obesity', 'sedentary lifestyle', 'family history']
    },
    {
      condition: 'Early Alzheimer\'s Disease',
      keywords: ['memory loss', 'confusion', 'difficulty concentrating', 'mood changes'],
      riskFactors: ['age', 'family history', 'head injury']
    },
    {
      condition: 'Potential Skin Cancer',
      keywords: ['unusual moles', 'skin changes', 'itching', 'bleeding'],
      riskFactors: ['sun exposure', 'fair skin', 'family history']
    }
  ];

  const results: DiagnosticResult[] = [];
  
  symptoms.forEach((symptom, index) => {
    const matchedConditions = conditions.filter(condition =>
      condition.keywords.some(keyword =>
        symptom.symptom.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (matchedConditions.length > 0) {
      const condition = matchedConditions[0];
      const confidence = Math.random() * 0.4 + 0.6; // 60-100%
      const riskLevel = confidence > 0.85 ? 'high' : confidence > 0.7 ? 'moderate' : 'low';
      
      results.push({
        id: `result-${index}`,
        condition: condition.condition,
        confidence: Math.round(confidence * 100),
        riskLevel: riskLevel as any,
        symptoms: [symptom.symptom],
        recommendations: generateRecommendations(condition.condition, riskLevel as any),
        urgency: riskLevel === 'high' ? 'urgent' : riskLevel === 'moderate' ? 'soon' : 'routine',
        date: new Date().toISOString()
      });
    }
  });

  return results;
};

export const analyzeImage = (fileName: string, type: string): ImageAnalysis => {
  const analysisTypes = {
    'chest-xray': {
      findings: ['Lung opacity detected in lower right lobe', 'Heart size within normal limits', 'No obvious fractures'],
      recommendations: ['Follow-up CT scan recommended', 'Consult pulmonologist', 'Monitor symptoms']
    },
    'mri': {
      findings: ['Mild white matter changes', 'No acute abnormalities', 'Age-appropriate findings'],
      recommendations: ['Routine follow-up in 6 months', 'Continue current medications', 'Lifestyle modifications']
    },
    'dermatology': {
      findings: ['Asymmetrical lesion borders', 'Color variation present', 'Diameter >6mm'],
      recommendations: ['Immediate dermatologist consultation', 'Biopsy recommended', 'Sun protection measures']
    }
  };

  const analysis = analysisTypes[type as keyof typeof analysisTypes] || analysisTypes['chest-xray'];
  const confidence = Math.random() * 0.3 + 0.7; // 70-100%
  const riskLevel = confidence > 0.9 ? 'high' : confidence > 0.8 ? 'moderate' : 'low';

  return {
    id: `analysis-${Date.now()}`,
    fileName,
    analysisType: type as any,
    findings: analysis.findings,
    confidence: Math.round(confidence * 100),
    riskLevel: riskLevel as any,
    recommendations: analysis.recommendations,
    date: new Date().toISOString()
  };
};

const generateRecommendations = (condition: string, riskLevel: string): string[] => {
  const baseRecommendations = {
    'Early Stage Cardiovascular Disease': [
      'Schedule cardiology consultation within 2 weeks',
      'Begin monitoring blood pressure daily',
      'Start moderate exercise program',
      'Consider cardiac stress test'
    ],
    'Type 2 Diabetes Risk': [
      'Schedule glucose tolerance test',
      'Consult endocrinologist',
      'Begin dietary modifications',
      'Monitor blood sugar levels'
    ],
    'Early Alzheimer\'s Disease': [
      'Schedule neurological evaluation',
      'Consider cognitive assessment battery',
      'Discuss with family members',
      'Brain imaging recommended'
    ],
    'Potential Skin Cancer': [
      'Urgent dermatology referral',
      'Avoid sun exposure',
      'Document lesion changes',
      'Consider biopsy'
    ]
  };

  return baseRecommendations[condition as keyof typeof baseRecommendations] || [
    'Consult healthcare provider',
    'Monitor symptoms closely',
    'Follow up as recommended'
  ];
};

export const calculateRiskScore = (riskFactors: RiskFactor[]): number => {
  const totalWeight = riskFactors.reduce((sum, factor) => sum + factor.weight, 0);
  const weightedScore = riskFactors.reduce((sum, factor) => {
    const value = typeof factor.value === 'boolean' ? (factor.value ? 1 : 0) : 
                  typeof factor.value === 'number' ? factor.value / 100 :
                  factor.value === 'high' ? 1 : factor.value === 'medium' ? 0.5 : 0;
    return sum + (value * factor.weight);
  }, 0);

  return Math.round((weightedScore / totalWeight) * 100);
};