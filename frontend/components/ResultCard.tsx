import React from 'react';
import { AnalysisResult } from '../utils/api';
import { motion } from 'framer-motion';

interface ResultCardProps {
  result: AnalysisResult;
  onReset?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const { verdict, confidence, flags } = result;
  const isPhishing = verdict === 'phishing';
  
  // Determine confidence level color
  const getConfidenceColor = () => {
    if (isPhishing) {
      if (confidence >= 80) return '#ef4444';
      if (confidence >= 50) return '#f87171';
      return '#fca5a5';
    } else {
      if (confidence >= 80) return '#10b981';
      if (confidence >= 50) return '#34d399';
      return '#6ee7b7';
    }
  };

  return (
    <div style={{
      position: 'relative',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      backgroundColor: isPhishing ? 'rgba(254, 226, 226, 0.1)' : 'rgba(209, 250, 229, 0.1)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${isPhishing ? 'rgba(248, 113, 113, 0.3)' : 'rgba(52, 211, 153, 0.3)'}`,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: `linear-gradient(to right, ${isPhishing ? '#ef4444, #f87171' : '#10b981, #34d399'})`
      }}></div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            padding: '0.5rem',
            borderRadius: '9999px',
            marginRight: '0.75rem',
            backgroundColor: isPhishing ? 'rgba(254, 226, 226, 0.5)' : 'rgba(209, 250, 229, 0.5)',
            color: isPhishing ? '#dc2626' : '#059669'
          }}>
            {isPhishing ? (
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>⚠️</span>
            ) : (
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>✅</span>
            )}
          </div>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#1e293b' }}>
            Analysis Result
          </h2>
        </div>
        <span style={{
          padding: '0.375rem 1rem',
          borderRadius: '9999px',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 500,
          backgroundColor: isPhishing ? '#ef4444' : '#10b981',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
          {isPhishing ? 'Phishing Detected' : 'Legitimate Email'}
        </span>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>Confidence Score</span>
          <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: getConfidenceColor() }}>{confidence}%</span>
        </div>
        <div style={{ height: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
          <div 
            style={{
              height: '100%',
              width: `${confidence}%`,
              backgroundColor: getConfidenceColor(),
              borderRadius: '9999px',
              transition: 'width 0.5s ease'
            }}
          ></div>
        </div>
      </div>

      {flags.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, marginBottom: '0.75rem', color: '#1e293b' }}>
            {isPhishing ? 'Phishing Indicators' : 'Suspicious Elements'}
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {flags.map((flag, index) => (
              <li key={index} style={{
                backgroundColor: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <span style={{ color: isPhishing ? '#ef4444' : '#f59e0b' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>⚠️</span>
                </span>
                <span style={{ color: '#1e293b' }}>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isPhishing && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(254, 226, 226, 0.5)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#ef4444' }}>⚠️</span>
            <div>
              <h4 style={{ fontWeight: 500, color: '#b91c1c', marginBottom: '0.25rem' }}>Warning: Potential Phishing Attempt</h4>
              <p style={{ color: '#b91c1c' }}>
                This email contains characteristics commonly found in phishing attempts. 
                Exercise caution and do not click on any links or provide personal information.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isPhishing && flags.length > 0 && (
        <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg shadow-inner">
          <div className="flex items-start space-x-3">
            <span className="text-lg font-bold text-warning-500">⚠️</span>
            <div>
              <h4 className="font-medium text-warning-700 mb-1">Use Caution</h4>
              <p className="text-warning-700">
                While this email appears legitimate, it contains some suspicious elements. 
                Always verify the sender before taking any actions or clicking on links.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isPhishing && flags.length === 0 && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(209, 250, 229, 0.5)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#10b981' }}>✅</span>
            <div>
              <h4 style={{ fontWeight: 500, color: '#047857', marginBottom: '0.25rem' }}>Email Appears Safe</h4>
              <p style={{ color: '#047857' }}>
                This email appears to be legitimate with no suspicious elements detected.
                Always practice good email security habits regardless.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Try Again Button */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: 'white',
            fontWeight: 500,
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
            e.currentTarget.style.boxShadow = '0 15px 20px -3px rgba(59, 130, 246, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
          }}
        >
          Analyze again
        </button>
      </div>
    </div>
  );
};

export default ResultCard;