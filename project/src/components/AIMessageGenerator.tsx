import React from 'react';

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

interface AIMessageGeneratorProps {
  data: CertificateData;
  onMessageGenerated: (message: string) => void;
}

export const AIMessageGenerator: React.FC<AIMessageGeneratorProps> = ({
  data,
  onMessageGenerated
}) => {
  const generateMessage = () => {
    // Simulated AI message generation with various templates
    const templates = [
      `has successfully completed the ${data.event} with exceptional dedication and skill. Your commitment to excellence and outstanding performance as a ${data.role} truly sets you apart.`,
      
      `demonstrated remarkable achievement in ${data.event}. Your exceptional performance and dedication as a ${data.role} have earned you this well-deserved recognition.`,
      
      `has shown outstanding commitment and excellence throughout ${data.event}. Your exceptional skills and dedication as a ${data.role} are truly commendable.`,
      
      `successfully completed ${data.event} with distinction. Your remarkable dedication and professional excellence as a ${data.role} have been truly impressive.`,
      
      `achieved exceptional results in ${data.event}. Your commitment to excellence and outstanding performance as a ${data.role} deserve special recognition.`
    ];

    // Select a random template or choose based on role/event type
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // Simulate API delay
    setTimeout(() => {
      onMessageGenerated(randomTemplate);
    }, 1500);
  };

  return { generateMessage };
};

// Hook for easier usage
export const useAIMessageGenerator = (data: CertificateData) => {
  const generateAIMessage = (): Promise<string> => {
    return new Promise((resolve) => {
      const templates = [
        `has successfully completed the ${data.event} with exceptional dedication and skill. Your commitment to excellence and outstanding performance as a ${data.role} truly sets you apart.`,
        
        `demonstrated remarkable achievement in ${data.event}. Your exceptional performance and dedication as a ${data.role} have earned you this well-deserved recognition.`,
        
        `has shown outstanding commitment and excellence throughout ${data.event}. Your exceptional skills and dedication as a ${data.role} are truly commendable.`,
        
        `successfully completed ${data.event} with distinction. Your remarkable dedication and professional excellence as a ${data.role} have been truly impressive.`,
        
        `achieved exceptional results in ${data.event}. Your commitment to excellence and outstanding performance as a ${data.role} deserve special recognition.`
      ];

      // Enhanced selection based on role type and event for more personalized messages
      let selectedTemplate;
      const role = data.role.toLowerCase();
      const event = data.event.toLowerCase();
      
      if (role.includes('participant') || role.includes('attendee')) {
        selectedTemplate = templates[0];
      } else if (role.includes('completion') || role.includes('graduate')) {
        selectedTemplate = templates[1];
      } else if (role.includes('excellence') || role.includes('honor')) {
        selectedTemplate = templates[2];
      } else if (role.includes('distinction') || role.includes('outstanding')) {
        selectedTemplate = templates[3];
      } else if (event.includes('workshop') || event.includes('training')) {
        selectedTemplate = `successfully completed the comprehensive ${data.event} program. Your dedication to learning and professional development as a ${data.role} demonstrates your commitment to excellence.`;
      } else if (event.includes('conference') || event.includes('summit')) {
        selectedTemplate = `actively participated in ${data.event} and contributed meaningfully as a ${data.role}. Your engagement and insights have enriched the learning experience for all.`;
      } else {
        selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      }

      // Simulate API delay
      setTimeout(() => {
        resolve(selectedTemplate);
      }, 1500);
    });
  };

  return { generateAIMessage };
};