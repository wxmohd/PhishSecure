/**
 * API utilities for communicating with the PhishSecure backend
 */

export interface AnalysisResult {
  verdict: 'phishing' | 'legitimate';
  confidence: number; // 0-100
  flags: string[];
}

/**
 * Analyzes an email for phishing indicators
 * @param emailContent The raw email content to analyze
 * @returns Analysis result with verdict, confidence score, and flags
 */
export const analyzeEmail = async (emailContent: string): Promise<AnalysisResult> => {
  try {
    // Replace with your actual backend URL when deployed
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: emailContent }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      verdict: data.verdict || 'legitimate',
      confidence: data.confidence || 0,
      flags: data.flags || []
    };
  } catch (error) {
    console.error('Error analyzing email:', error);
    throw error;
  }
};