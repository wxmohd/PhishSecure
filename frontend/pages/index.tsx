import React from 'react';
import Head from 'next/head';
import EmailInput from '../components/EmailInput';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <Head>
        <title>PhishSecure - Email Phishing Detection</title>
        <meta name="description" content="AI-powered phishing email detection tool" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">PhishSecure</h1>
          <p className="text-xl text-gray-600">AI-powered phishing email detection</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">How it works</h2>
            <p className="text-gray-700">
              PhishSecure uses advanced machine learning to analyze emails and detect phishing attempts.
              Simply paste the email content below, and our AI will identify suspicious elements and provide a verdict.
            </p>
          </div>
          
          <EmailInput />
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Common Phishing Indicators</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-blue-600 mb-2">Suspicious Links</h3>
              <p className="text-gray-700">Links that don't match their display text or lead to unusual domains.</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-blue-600 mb-2">Urgent Language</h3>
              <p className="text-gray-700">Messages creating a false sense of urgency to prompt immediate action.</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-blue-600 mb-2">Spoofed Sender</h3>
              <p className="text-gray-700">Email appears to come from a trusted source but the actual sender is different.</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-blue-600 mb-2">Request for Information</h3>
              <p className="text-gray-700">Asking for personal, financial, or login information via email.</p>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PhishSecure - AI-powered phishing detection</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;