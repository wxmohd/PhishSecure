// index.tsx
import Head from 'next/head';
import { EmailInput } from '../components/EmailInput';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { analyzeEmail, AnalysisResult } from '../utils/api';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleEmailSubmit = async (email: string) => {
    // Reset previous results and errors
    setAnalysisResult(null);
    setError(null);
    setIsAnalyzing(true);
    
    try {
      console.log('Analyzing email content...');
      const result = await analyzeEmail(email);
      console.log('Analysis result:', result);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Error analyzing email:', err);
      setError('Failed to analyze email. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    // Reset the analysis state
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #4c1d95)' }}>
      <Head>
        <title>PhishSecure | Email Security</title>
        <meta name="description" content="AI-Powered Phishing Email Detection" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', 
          top: '25%', 
          left: '25%', 
          width: '16rem', 
          height: '16rem', 
          backgroundColor: '#3b82f6', 
          borderRadius: '9999px', 
          mixBlendMode: 'multiply', 
          filter: 'blur(64px)', 
          opacity: 0.2,
          animation: 'blob 7s infinite'
        }}></div>
        <div style={{ 
          position: 'absolute', 
          top: '33%', 
          right: '25%', 
          width: '18rem', 
          height: '18rem', 
          backgroundColor: '#8b5cf6', 
          borderRadius: '9999px', 
          mixBlendMode: 'multiply', 
          filter: 'blur(64px)', 
          opacity: 0.2,
          animation: 'blob 7s infinite',
          animationDelay: '2s'
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: '25%', 
          right: '33%', 
          width: '20rem', 
          height: '20rem', 
          backgroundColor: '#6366f1', 
          borderRadius: '9999px', 
          mixBlendMode: 'multiply', 
          filter: 'blur(64px)', 
          opacity: 0.2,
          animation: 'blob 7s infinite',
          animationDelay: '4s'
        }}></div>
      </div>

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, paddingTop: '1.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ 
              background: 'linear-gradient(to right, #22d3ee, #3b82f6)', 
              padding: '0.5rem', 
              borderRadius: '0.5rem' 
            }}>
              <span style={{ fontSize: '1.25rem' }}>🛡️</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>PhishSecure</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="https://github.com/wxmohd/PhishSecure" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem', 
                fontSize: '0.875rem', 
                color: '#bfdbfe', 
                transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#bfdbfe'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>
      </header>

      <motion.main
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '4rem 1.5rem',
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Left column - Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '9999px',
              background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#bfdbfe' }}>AI-Powered Email Security</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.75rem)', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              fontFamily: '"Space Grotesk", sans-serif',
              lineHeight: '1.1'
            }}>
              <span style={{ 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text',
                color: 'transparent', 
                backgroundImage: 'linear-gradient(to right, #22d3ee, #3b82f6, #8b5cf6)'
              }}>Detect Phishing</span>
              <br />Before It's Too Late
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: '#e0f2fe', marginBottom: '2rem', maxWidth: '32rem' }}>
              Our advanced AI analyzes suspicious emails in seconds to protect you from phishing attacks and social engineering threats.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>              
              <a 
                href="#how-it-works" 
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(30, 58, 138, 0.5)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(29, 78, 216, 0.5)',
                  color: '#e0f2fe',
                  fontWeight: 500,
                  transition: 'background-color 0.2s ease',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 64, 175, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.5)';
                }}
              >
                How It Works
              </a>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', marginRight: '-0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(to right, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>🔒</div>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginLeft: '-0.5rem' }}>🛡️</div>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(to right, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginLeft: '-0.5rem' }}>✓</div>
              </div>
              <span style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Trusted by <span style={{ fontWeight: 600 }}>2,000+</span> users</span>
            </div>
          </motion.div>
          
          {/* Right column - Email analyzer */}
          <motion.div
            id="analyzer"
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              borderRadius: '1rem',
              padding: '0.25rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
              borderRadius: '1rem',
              filter: 'blur(16px)',
              zIndex: -1
            }}></div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Email Analyzer</h2>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px', 
                  backgroundColor: 'rgba(30, 58, 138, 0.5)', 
                  fontSize: '0.75rem', 
                  fontWeight: 500, 
                  color: '#bfdbfe' 
                }}>
                  <span style={{ 
                    width: '0.5rem', 
                    height: '0.5rem', 
                    borderRadius: '9999px', 
                    backgroundColor: '#34d399',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}></span>
                  <span>AI Powered</span>
                </div>
              </div>
              
              <EmailInput onSubmit={handleEmailSubmit} />
              
              {isAnalyzing && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    borderRadius: '9999px', 
                    border: '4px solid #bfdbfe', 
                    borderTopColor: '#2563eb',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                  }}></div>
                  <p style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Analyzing email content...</p>
                </div>
              )}
              
              {error && (
                <div style={{ 
                  marginTop: '1.5rem', 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: 'rgba(254, 226, 226, 0.2)', 
                  border: '1px solid rgba(248, 113, 113, 0.3)',
                  color: '#fca5a5'
                }}>
                  <p>{error}</p>
                </div>
              )}
              
              {analysisResult && !isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: '1.5rem' }}
                >
                  <ResultCard result={analysisResult} onReset={handleReset} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Features section */}
        <motion.section 
          id="how-it-works"
          style={{ marginTop: '6rem', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>How PhishSecure Works</h2>
            <p style={{ color: '#bfdbfe', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>Our advanced AI model analyzes email content to identify potential phishing attempts and keep you safe.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.5)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to bottom right, #3b82f6, #22d3ee)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>📧</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>Email Analysis</h3>
              <p style={{ color: '#bfdbfe' }}>Paste any suspicious email content and our AI will analyze it for common phishing patterns.</p>
            </div>
            
            {/* Feature 2 */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.5)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to bottom right, #8b5cf6, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>Threat Detection</h3>
              <p style={{ color: '#bfdbfe' }}>Our model identifies suspicious links, spoofed domains, and social engineering tactics.</p>
            </div>
            
            {/* Feature 3 */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.5)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to bottom right, #10b981, #34d399)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>🛡️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>Instant Results</h3>
              <p style={{ color: '#bfdbfe' }}>Get immediate feedback on whether an email is legitimate or potentially dangerous.</p>
            </div>
          </div>
        </motion.section>
        
        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  borderRadius: '9999px', 
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '0.5rem' 
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>P</span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>PhishSecure</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#bfdbfe', marginTop: '0.5rem' }}> 2024 PhishSecure. All rights reserved.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a 
                href="#" 
                style={{ color: '#bfdbfe', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#bfdbfe'; }}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                style={{ color: '#bfdbfe', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#bfdbfe'; }}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                style={{ color: '#bfdbfe', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#bfdbfe'; }}
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
        <div className="text-center mt-6 text-blue-400/70">
            Built with by <span className="font-semibold text-blue-300">Walaa</span> | Powered by AI
          </div>
      </motion.main>
    </div>
  );
}
