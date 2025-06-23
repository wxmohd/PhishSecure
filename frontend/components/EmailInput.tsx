import { useState } from 'react';
import { analyzeEmail, AnalysisResult } from '../utils/api';
import ResultCard from './ResultCard';

const EmailInput: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailContent.trim()) {
      setError('Please enter email content to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResult = await analyzeEmail(emailContent);
      setResult(analysisResult);
    } catch (err) {
      setError('Failed to analyze email. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmailContent('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-1">
              Paste Email Content
            </label>
            <textarea
              id="email-content"
              className="textarea"
              placeholder="Paste the full email content here (including headers, subject, body, etc.)"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={10}
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Analyze Email'}
            </button>
            <button
              type="button"
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={handleReset}
              disabled={isLoading || (!emailContent && !result)}
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <ResultCard result={result} />
          <button
            onClick={handleReset}
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 w-full"
          >
            Analyze Another Email
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailInput;