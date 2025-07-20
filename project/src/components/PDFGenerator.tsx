import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export const generatePDF = async (
  certificateRef: HTMLDivElement,
  data: CertificateData
): Promise<void> => {
  try {
    // Configure html2canvas for better quality
    const canvas = await html2canvas(certificateRef, {
      scale: 3, // Even higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 600,
      logging: false, // Disable logging for cleaner output
      imageTimeout: 15000, // Increase timeout for logo loading
      removeContainer: true
    });

    // Create PDF with landscape orientation for certificate
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600]
    });

    // Calculate dimensions to fit the page
    const imgWidth = 800;
    const imgHeight = 600;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Add the image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Generate filename with timestamp
    const fileName = `Certificate_${data.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const downloadCertificate = (
  certificateRef: HTMLDivElement | null,
  data: CertificateData
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!certificateRef) {
      reject(new Error('Certificate reference not found'));
      return;
    }

    generatePDF(certificateRef, data)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};