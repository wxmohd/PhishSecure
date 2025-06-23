// EmailInput.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const EmailInput = ({ onSubmit }: { onSubmit: (email: string) => void }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  // Check if the text contains email-like format
  const checkEmailFormat = (text: string) => {
    if (!text.trim()) {
      setValidationMessage('');
      return;
    }
    
    // Simple check for @ symbol
    if (!text.includes('@')) {
      setValidationMessage('Email should contain @ symbol');
      return;
    }
    
    // Check for domain-like structure
    if (!text.match(/@[^@]+\.[^@]+$/)) {
      setValidationMessage('Email should have a domain (e.g., @gmail.com)');
      return;
    }
    
    // All checks passed - any email with @ and a domain is accepted
    setValidationMessage('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setIsTyping(true);
    
    // Clear previous timer
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      checkEmailFormat(newValue);
      setIsTyping(false);
    }, 500);
    
    setTypingTimer(timer);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [typingTimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsLoading(true);
      onSubmit(email);
    }
  };

  return (
    <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '0.25rem', height: '1.5rem', backgroundColor: '#3b82f6', borderRadius: '9999px' }}></div>
          <label htmlFor="email-input" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#bfdbfe' }}>Paste suspicious email content</label>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }}>
            <textarea
              id="email-input"
              value={email}
              onChange={handleEmailChange}
              placeholder="Paste the email content here..."
              style={{
                width: '100%',
                height: '10rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(30, 64, 175, 0.5)',
                color: 'white',
                resize: 'none',
                backdropFilter: 'blur(4px)',
                boxShadow: 'inset 0 2px 4px 0 rgba(30, 58, 138, 0.2)',
                outline: 'none'
              }}
              className="white-placeholder"
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2), inset 0 2px 4px 0 rgba(30, 58, 138, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(30, 64, 175, 0.5)';
                e.target.style.boxShadow = 'inset 0 2px 4px 0 rgba(30, 58, 138, 0.2)';
              }}
              disabled={isLoading}
            />
            
            {/* Email validation message */}
            {isTyping && email.trim() && (
              <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.875rem', 
                color: '#93c5fd',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Typing...</span>
              </div>
            )}
            
            {!isTyping && validationMessage && (
              <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.875rem', 
                color: '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{validationMessage}</span>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit"
              disabled={isLoading || (!!validationMessage && !isTyping)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                color: 'white',
                fontWeight: 500,
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s ease',
                cursor: (isLoading || (!!validationMessage && !isTyping)) ? 'not-allowed' : 'pointer',
                opacity: (isLoading || (!!validationMessage && !isTyping)) ? 0.7 : 1,
                border: 'none',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => {
                if (!isLoading && !validationMessage) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
                  e.currentTarget.style.boxShadow = '0 15px 20px -3px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading && !validationMessage) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '1rem', 
                    height: '1rem', 
                    border: '2px solid rgba(255, 255, 255, 0.3)', 
                    borderTop: '2px solid white', 
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Analyzing...</span>
                </div>
              ) : 'Analyze Email'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};