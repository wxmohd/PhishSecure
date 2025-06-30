import React from 'react';
import { AnalysisResult } from '../utils/api';

interface DebugPanelProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ isAnalyzing, result, error }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto'
    }}>
      <div><strong>Debug Info:</strong></div>
      <div>isAnalyzing: {isAnalyzing ? 'true' : 'false'}</div>
      <div>Error: {error || 'none'}</div>
      <div>Result: {result ? JSON.stringify(result, null, 2) : 'null'}</div>
    </div>
  );
};

export default DebugPanel;
