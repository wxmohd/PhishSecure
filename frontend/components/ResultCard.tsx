import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '../utils/api';

interface ResultCardProps {
  result: AnalysisResult;
  onReset?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  const { verdict, confidence, flags } = result;
  // Override the verdict based on confidence score - if 60% or below, it's phishing
  const isPhishing = confidence <= 60 ? true : verdict === 'phishing';
  
  // Determine confidence level color
  const getConfidenceColor = () => {
    if (isPhishing) {
      if (confidence >= 80) return '#ef4444';
      if (confidence >= 50) return '#f87171';
      return '#fca5a5';
    } else {
      if (confidence >= 80) return 'var(--neon-green)';
      if (confidence >= 50) return 'var(--lime-green)';
      return 'var(--mint-green)';
    }
  };

  // Animation variants for terminal-style reveal
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          style={{
            position: 'relative',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: isPhishing ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${isPhishing ? 'rgba(239, 68, 68, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`,
            boxShadow: `0 0 20px ${isPhishing ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
            overflow: 'hidden'
          }}
        >
          {/* Terminal scanline effect */}
          <motion.div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, 0.03) 50%)',
              backgroundSize: '100% 4px',
              zIndex: 2,
              opacity: 0.3
            }}
          ></motion.div>
          
          {/* Terminal flicker effect */}
          <motion.div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              backgroundColor: 'transparent',
              opacity: 0.02,
              zIndex: 1
            }}
          ></motion.div>
          
          <motion.div 
            variants={itemVariants}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: `linear-gradient(to right, ${isPhishing ? '#ef4444, #f87171' : 'var(--neon-green), var(--lime-green)'})`
            }}
          ></motion.div>
          
          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '0.5rem',
                borderRadius: '9999px',
                marginRight: '0.75rem',
                backgroundColor: isPhishing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                color: isPhishing ? '#dc2626' : 'var(--neon-green)'
              }}>
                {isPhishing ? (
                  <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>⚠️</span>
                ) : (
                  <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>✅</span>
                )}
              </div>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-bright)' }}>
                Analysis Result
              </h2>
            </div>
            <span style={{
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: isPhishing ? '#ef4444' : 'var(--neon-green)',
              boxShadow: isPhishing ? '0 0 10px rgba(239, 68, 68, 0.5)' : '0 0 10px rgba(74, 222, 128, 0.5)',
              border: isPhishing ? '1px solid rgba(239, 68, 68, 0.7)' : '1px solid rgba(74, 222, 128, 0.7)',
              textShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
            }}>
              {confidence <= 60 ? 'Phishing Detected' : (isPhishing ? 'Phishing Detected' : 'Legitimate Email')}
            </span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Confidence Score</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: getConfidenceColor() }}>{confidence}%</span>
            </div>
            <div style={{ height: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
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
          </motion.div>

          {flags.length > 0 && (
            <motion.div 
              variants={itemVariants}
              style={{ marginBottom: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1.125rem', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-bright)' }}>
                {isPhishing ? 'Phishing Indicators' : 'Suspicious Elements'}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {flags.map((flag, index) => (
                  <li key={index} style={{
                    backgroundColor: 'rgba(10, 14, 18, 0.7)',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <span style={{ color: isPhishing ? '#ef4444' : '#f59e0b' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>⚠️</span>
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{flag}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {isPhishing && (
            <motion.div 
              variants={itemVariants}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(4px)'
              }}
            >
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
            </motion.div>
          )}

          {!isPhishing && flags.length > 0 && (
            <motion.div 
              variants={itemVariants}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '0.5rem',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#f59e0b' }}>⚠️</span>
                <div>
                  <h4 style={{ fontWeight: 500, color: '#d97706', marginBottom: '0.25rem' }}>Use Caution</h4>
                  <p style={{ color: '#d97706' }}>
                    While this email appears legitimate, it contains some suspicious elements. 
                    Always verify the sender before taking any actions or clicking on links.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {!isPhishing && flags.length === 0 && (
            <motion.div 
              variants={itemVariants}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                borderRadius: '0.5rem',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#10b981' }}>✅</span>
                <div>
                  <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem', textShadow: '0 0 5px rgba(4, 120, 87, 0.5)' }}>Email Appears Safe</h4>
                  <p style={{ color: 'white', textShadow: '0 0 3px rgba(4, 120, 87, 0.3)' }}>
                    This email appears to be legitimate with no suspicious elements detected.
                    Always practice good email security habits regardless.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultCard;
