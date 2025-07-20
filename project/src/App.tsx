import React, { useState, useRef } from 'react';
import { CertificateForm } from './components/CertificateForm';
import { CertificatePreview } from './components/CertificatePreview';
import { useAIMessageGenerator } from './components/AIMessageGenerator';
import { downloadCertificate } from './components/PDFGenerator';
import { Download, Sparkles, Award } from 'lucide-react';

interface CertificateData {
  name: string;
  event: string;
  role: string;
  date: string;
  organization: string;
  template: string;
  logo: string | null;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  fontSize: 'small' | 'medium' | 'large';
  fontStyle: 'serif' | 'sans-serif' | 'script';
  borderStyle: 'classic' | 'modern' | 'ornate' | 'minimal';
}

function App() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    name: '',
    event: '',
    role: '',
    date: '',
    organization: '',
    template: 'classic',
    logo: null,
    logoPosition: 'top-left',
    fontSize: 'medium',
    fontStyle: 'serif',
    borderStyle: 'classic'
  });
  
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const certificateRef = useRef<HTMLDivElement>(null);
  const { generateAIMessage } = useAIMessageGenerator(certificateData);

  const handleDataChange = (data: CertificateData) => {
    setCertificateData(data);
  };

  const handleGenerateMessage = async () => {
    setIsGenerating(true);
    try {
      const message = await generateAIMessage();
      setAiMessage(message);
    } catch (error) {
      console.error('Failed to generate AI message:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    try {
      await downloadCertificate(certificateRef.current, certificateData);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const isFormValid = certificateData.name && certificateData.event && certificateData.role;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Certificate Generator</h1>
              <p className="text-gray-600">Create professional certificates with AI-powered personalization</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <CertificateForm
              onDataChange={handleDataChange}
              onGenerateMessage={handleGenerateMessage}
              isGenerating={isGenerating}
            />

            {/* AI Message Display */}
            {aiMessage && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">AI Generated Message</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{aiMessage}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleGenerateMessage}
                    disabled={isGenerating}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={() => setAiMessage('')}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(aiMessage)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Copy Text
                  </button>
                </div>
              </div>
            )}

            {/* Download Button */}
            {isFormValid && (
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>{isDownloading ? 'Generating PDF...' : 'Download Certificate PDF'}</span>
              </button>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <CertificatePreview
              ref={certificateRef}
              data={certificateData}
              message={aiMessage}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>AI-Powered Certificate Generator • Create professional certificates with ease</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;