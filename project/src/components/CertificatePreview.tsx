import React, { forwardRef } from "react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { Star, Award, Shield } from "lucide-react";

interface CertificateData {
  name: string;
  event: string;
  role: string;
  date: string;
  organization: string;
  template: string;
  logo: string | null;
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  fontSize: "small" | "medium" | "large";
  fontStyle: "serif" | "sans-serif" | "script";
  borderStyle: "classic" | "modern" | "ornate" | "minimal";
}

interface CertificatePreviewProps {
  data: CertificateData;
  message: string;
}

export const CertificatePreview = forwardRef<
  HTMLDivElement,
  CertificatePreviewProps
>(({ data, message }, ref) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const certificateId = `CERT-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const verificationUrl = `https://verify-certificate.com/${certificateId}`;
        const url = await QRCode.toDataURL(verificationUrl, {
          width: 100,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error("QR Code generation failed:", error);
      }
    };

    generateQRCode();
  }, [data]);

  const getTemplateStyles = () => {
    switch (data.template) {
      case "classic":
        return {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "border-blue-300",
          accent: "text-blue-700",
          secondary: "#e0e7ff",
          pattern: "bg-blue-50",
        };
      case "elegant":
        return {
          background: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
          border: "border-amber-300",
          accent: "text-amber-700",
          secondary: "#fef3c7",
          pattern: "bg-amber-50",
        };
      case "modern":
        return {
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          border: "border-emerald-300",
          accent: "text-emerald-700",
          secondary: "#d1fae5",
          pattern: "bg-emerald-50",
        };
      case "corporate":
        return {
          background: "linear-gradient(135deg, #434343 0%, #000000 100%)",
          border: "border-slate-300",
          accent: "text-slate-700",
          secondary: "#f1f5f9",
          pattern: "bg-slate-50",
        };
      case "royal":
        return {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "border-purple-400",
          accent: "text-purple-700",
          secondary: "#f3e8ff",
          pattern: "bg-purple-50",
        };
      case "academic":
        return {
          background: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
          border: "border-indigo-400",
          accent: "text-indigo-700",
          secondary: "#e0e7ff",
          pattern: "bg-indigo-50",
        };
      case "achievement":
        return {
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          border: "border-red-400",
          accent: "text-red-700",
          secondary: "#fee2e2",
          pattern: "bg-red-50",
        };
      case "excellence":
        return {
          background: "linear-gradient(135deg, #0d9488 0%, #134e4a 100%)",
          border: "border-teal-400",
          accent: "text-teal-700",
          secondary: "#ccfbf1",
          pattern: "bg-teal-50",
        };
      case "premium":
        return {
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          border: "border-gray-500",
          accent: "text-gray-700",
          secondary: "#f9fafb",
          pattern: "bg-gray-50",
        };
      case "creative":
        return {
          background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
          border: "border-orange-400",
          accent: "text-orange-700",
          secondary: "#fed7aa",
          pattern: "bg-orange-50",
        };
      default:
        return {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "border-blue-300",
          accent: "text-blue-700",
          secondary: "#e0e7ff",
          pattern: "bg-blue-50",
        };
    }
  };

  const styles = getTemplateStyles();

  const getFontSizeClasses = () => {
    switch (data.fontSize) {
      case "small":
        return {
          title: "text-3xl",
          name: "text-4xl",
          content: "text-base",
          event: "text-lg",
        };
      case "large":
        return {
          title: "text-5xl",
          name: "text-6xl",
          content: "text-xl",
          event: "text-2xl",
        };
      default: // medium
        return {
          title: "text-4xl",
          name: "text-5xl",
          content: "text-lg",
          event: "text-xl",
        };
    }
  };

  const getFontStyleClass = () => {
    switch (data.fontStyle) {
      case "sans-serif":
        return "font-sans";
      case "script":
        return "font-mono";
      default: // serif
        return "font-serif";
    }
  };

  const getBorderStyles = () => {
    switch (data.borderStyle) {
      case "modern":
        return "border-4 border-gray-300 rounded-3xl shadow-2xl";
      case "ornate":
        return "border-8 border-double border-gray-400 rounded-2xl shadow-2xl";
      case "minimal":
        return "border-2 border-gray-200 rounded-2xl shadow-xl";
      default: // classic
        return "border-8 border-gray-300 rounded-2xl shadow-2xl";
    }
  };

  const fontSizes = getFontSizeClasses();
  const fontStyle = getFontStyleClass();
  const borderStyle = getBorderStyles();

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const getLogoPositionStyles = () => {
    switch (data.logoPosition) {
      case "top-left":
        return "absolute top-8 left-8";
      case "top-right":
        return "absolute top-8 right-8";
      case "bottom-left":
        return "absolute bottom-8 left-8";
      case "bottom-right":
        return "absolute bottom-8 right-8";
      default:
        return "absolute top-8 left-8";
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <Award className="w-6 h-6 text-blue-600" />
        <span>Certificate Preview</span>
      </h2>

      <div
        ref={ref}
        className={`certificate-content bg-white ${borderStyle} p-16 mx-auto ${fontStyle} relative overflow-hidden`}
        style={{
          width: "800px",
          height: "600px",
          background: "white",
          position: "relative",
        }}
      >
        {/* Header with gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-6 rounded-t-2xl"
          style={{ background: styles.background }}
        />

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${styles.secondary} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${styles.secondary} 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-6 rounded-b-2xl"
          style={{ background: styles.background }}
        />

        {/* Organization Logo */}
        {data.logo && (
          <div className={getLogoPositionStyles()}>
            <img
              src={data.logo}
              alt="Organization Logo"
              className="w-20 h-20 object-contain"
              style={{ maxWidth: "80px", maxHeight: "80px" }}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="text-center h-full flex flex-col justify-between relative z-10">
          {/* Title */}
          <div className="mb-8 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <Star className="w-8 h-8 text-yellow-500 fill-current" />
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
              </div>
            </div>
            <h1
              className={`${fontSizes.title} font-bold text-gray-800 mb-4 tracking-wide`}
            >
              Certificate of Achievement
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <div
                className="w-16 h-1 rounded-full"
                style={{ background: styles.background }}
              />
              <Shield className="w-6 h-6 text-gray-600" />
              <div
                className="w-16 h-1 rounded-full"
                style={{ background: styles.background }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col justify-center space-y-8">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl opacity-10"
                style={{ background: styles.background }}
              />
              <div className="relative p-8">
                <p className={`${fontSizes.content} text-gray-600 italic mb-4`}>
                  This is to certify that
                </p>

                <div className="mb-6">
                  <div
                    className="w-32 h-0.5 mx-auto mb-4 rounded-full"
                    style={{ background: styles.background }}
                  />
                  <h2
                    className={`${fontSizes.name} font-bold text-gray-800 mb-4 tracking-wide`}
                  >
                    {data.name || "[Recipient Name]"}
                  </h2>
                  <div
                    className="w-32 h-0.5 mx-auto rounded-full"
                    style={{ background: styles.background }}
                  />
                </div>

                <div className="max-w-lg mx-auto">
                  <p
                    className={`${fontSizes.content} text-gray-700 leading-relaxed`}
                  >
                    {message ||
                      `has successfully completed the ${
                        data.event || "[Event Name]"
                      } as a ${
                        data.role || "[Role]"
                      } and demonstrated exceptional dedication and skill.`}
                  </p>
                </div>

                {data.event && (
                  <div className="mt-6">
                    <p
                      className={`${fontSizes.event} font-semibold text-gray-800`}
                    >
                      {data.event}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center space-x-8 opacity-20">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end pt-8">
            <div className="text-left flex-1">
              {data.organization && (
                <div className="mb-6">
                  <div
                    className="w-16 h-0.5 mb-2 rounded-full"
                    style={{ background: styles.background }}
                  />
                  <p className="text-lg font-bold text-gray-800 tracking-wide">
                    {data.organization}
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Authorized Institution
                  </p>
                </div>
              )}
              {formattedDate && (
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Date of Completion
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {formattedDate}
                  </p>
                </div>
              )}
            </div>

            {qrCodeUrl && (
              <div className="text-center flex-shrink-0 ml-8">
                <div className="bg-white p-2 rounded-lg shadow-md border">
                  <img
                    src={qrCodeUrl}
                    alt="Verification QR Code"
                    className="w-16 h-16 mb-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Scan to verify</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced decorative corners */}
        {!data.logo || data.logoPosition !== "top-left" ? (
          <div className="absolute top-8 left-8 w-16 h-16">
            <div
              className="w-full h-full rounded-full opacity-15 border-4 border-white"
              style={{ background: styles.background }}
            />
            <div className="absolute inset-2 rounded-full bg-white opacity-30" />
          </div>
        ) : null}

        {!data.logo || data.logoPosition !== "top-right" ? (
          <div className="absolute top-8 right-8 w-16 h-16">
            <div
              className="w-full h-full rounded-full opacity-15 border-4 border-white"
              style={{ background: styles.background }}
            />
            <div className="absolute inset-2 rounded-full bg-white opacity-30" />
          </div>
        ) : null}

        {!data.logo || data.logoPosition !== "bottom-left" ? (
          <div className="absolute bottom-8 left-8 w-16 h-16">
            <div
              className="w-full h-full rounded-full opacity-15 border-4 border-white"
              style={{ background: styles.background }}
            />
            <div className="absolute inset-2 rounded-full bg-white opacity-30" />
          </div>
        ) : null}

        {!data.logo || data.logoPosition !== "bottom-right" ? (
          <div className="absolute bottom-8 right-8 w-16 h-16">
            <div
              className="w-full h-full rounded-full opacity-15 border-4 border-white"
              style={{ background: styles.background }}
            />
            <div className="absolute inset-2 rounded-full bg-white opacity-30" />
          </div>
        ) : null}

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div
            className="absolute top-6 left-6 w-8 h-0.5 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
          <div
            className="absolute top-6 left-6 w-0.5 h-8 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
        </div>

        <div className="absolute top-0 right-0 w-20 h-20">
          <div
            className="absolute top-6 right-6 w-8 h-0.5 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
          <div
            className="absolute top-6 right-6 w-0.5 h-8 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-20 h-20">
          <div
            className="absolute bottom-6 left-6 w-8 h-0.5 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
          <div
            className="absolute bottom-6 left-6 w-0.5 h-8 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
        </div>

        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div
            className="absolute bottom-6 right-6 w-8 h-0.5 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
          <div
            className="absolute bottom-6 right-6 w-0.5 h-8 rounded-full opacity-30"
            style={{ background: styles.background }}
          />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
