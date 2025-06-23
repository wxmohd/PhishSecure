import React from 'react';
import { AnalysisResult } from '../utils/api';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { verdict, confidence, flags } = result;
  const isPhishing = verdict === 'phishing';
  
  // Determine confidence level class
  const getConfidenceClass = () => {
    if (confidence >= 80) return 'confidence-high';
    if (confidence >= 50) return 'confidence-medium';
    return 'confidence-low';
  };

  return (
    <div className={`card ${isPhishing ? 'result-phishing' : 'result-safe'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          Analysis Result
        </h2>
        <span 
          className={`px-3 py-1 rounded-full text-white text-sm font-medium ${isPhishing ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isPhishing ? 'Phishing Detected' : 'Legitimate Email'}
        </span>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Confidence</span>
          <span className="text-sm font-medium">{confidence}%</span>
        </div>
        <div className="confidence-bar">
          <div 
            className={`confidence-level ${getConfidenceClass()}`} 
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>

      {flags.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2">
            {isPhishing ? 'Phishing Indicators' : 'Suspicious Elements'}
          </h3>
          <ul className="space-y-2">
            {flags.map((flag, index) => (
              <li key={index} className="flag-item">
                <span className="text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isPhishing && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">
            <strong>Warning:</strong> This email contains characteristics commonly found in phishing attempts. 
            Exercise caution and do not click on any links or provide personal information.
          </p>
        </div>
      )}

      {!isPhishing && flags.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> While this email appears legitimate, it contains some suspicious elements. 
            Always verify the sender before taking any actions.
          </p>
        </div>
      )}

      {!isPhishing && flags.length === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700">
            <strong>Safe:</strong> This email appears to be legitimate with no suspicious elements detected.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;