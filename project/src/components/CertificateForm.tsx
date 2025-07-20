import React, { useState } from "react";
import {
  User,
  Calendar,
  Award,
  MapPin,
  Sparkles,
  Upload,
  X,
  Palette,
  Type,
} from "lucide-react";

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

interface CertificateFormProps {
  onDataChange: (data: CertificateData) => void;
  onGenerateMessage: () => void;
  isGenerating: boolean;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({
  onDataChange,
  onGenerateMessage,
  isGenerating,
}) => {
  const [formData, setFormData] = useState<CertificateData>({
    name: "",
    event: "",
    role: "",
    date: "",
    organization: "",
    template: "classic",
    logo: null,
    logoPosition: "top-left",
    fontSize: "medium",
    fontStyle: "serif",
    borderStyle: "classic",
  });

  const handleChange = (field: keyof CertificateData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const templates = [
    { id: "classic", name: "Classic Blue", color: "bg-blue-100" },
    { id: "elegant", name: "Elegant Gold", color: "bg-yellow-100" },
    { id: "modern", name: "Modern Green", color: "bg-green-100" },
    { id: "corporate", name: "Corporate Gray", color: "bg-gray-100" },
    { id: "royal", name: "Royal Purple", color: "bg-purple-100" },
    { id: "academic", name: "Academic Navy", color: "bg-indigo-100" },
    { id: "achievement", name: "Achievement Red", color: "bg-red-100" },
    { id: "excellence", name: "Excellence Teal", color: "bg-teal-100" },
    { id: "premium", name: "Premium Black", color: "bg-slate-100" },
    { id: "creative", name: "Creative Orange", color: "bg-orange-100" },
  ];

  const fontSizes = [
    { id: "small", name: "Small", preview: "text-sm" },
    { id: "medium", name: "Medium", preview: "text-base" },
    { id: "large", name: "Large", preview: "text-lg" },
  ];

  const fontStyles = [
    { id: "serif", name: "Serif", preview: "font-serif" },
    { id: "sans-serif", name: "Sans Serif", preview: "font-sans" },
    { id: "script", name: "Script", preview: "font-mono" },
  ];

  const borderStyles = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "ornate", name: "Ornate" },
    { id: "minimal", name: "Minimal" },
  ];

  const logoPositions = [
    { id: "top-left", name: "Top Left" },
    { id: "top-right", name: "Top Right" },
    { id: "bottom-left", name: "Bottom Left" },
    { id: "bottom-right", name: "Bottom Right" },
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        handleChange("logo", logoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    handleChange("logo", null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Award className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Certificate Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4" />
            <span>Recipient Name</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter recipient's full name"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Award className="w-4 h-4" />
            <span>Event/Course Name</span>
          </label>
          <input
            type="text"
            value={formData.event}
            onChange={(e) => handleChange("event", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Web Development Bootcamp"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4" />
            <span>Role/Achievement</span>
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Participant, Completion, Excellence"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>Date</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Award className="w-4 h-4" />
            <span>Organization</span>
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your organization or institution name"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Organization Logo
        </h3>

        {!formData.logo ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Click to upload organization logo
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, SVG up to 5MB</p>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
              <img
                src={formData.logo}
                alt="Organization Logo"
                className="w-16 h-16 object-contain rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  Logo uploaded successfully
                </p>
                <p className="text-xs text-gray-500">
                  This will appear on your certificate
                </p>
              </div>
              <button
                onClick={removeLogo}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {formData.logo && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Logo Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              {logoPositions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => handleChange("logoPosition", position.id)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    formData.logoPosition === position.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {position.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Type className="w-5 h-5" />
          <span>Typography & Style</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Font Size
            </label>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleChange("fontSize", size.id)}
                  className={`w-full p-2 text-left rounded-lg border transition-all ${
                    formData.fontSize === size.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className={size.preview}>{size.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Font Style
            </label>
            <div className="space-y-2">
              {fontStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleChange("fontStyle", style.id)}
                  className={`w-full p-2 text-left rounded-lg border transition-all ${
                    formData.fontStyle === style.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  } ${style.preview}`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Border Style
            </label>
            <div className="space-y-2">
              {borderStyles.map((border) => (
                <button
                  key={border.id}
                  onClick={() => handleChange("borderStyle", border.id)}
                  className={`w-full p-2 text-left rounded-lg border transition-all ${
                    formData.borderStyle === border.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {border.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Choose Template</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleChange("template", template.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.template === template.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              } ${template.color}`}
            >
              <div className="text-sm font-medium text-gray-800">
                {template.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerateMessage}
        disabled={
          isGenerating || !formData.name || !formData.event || !formData.role
        }
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        <Sparkles className="w-5 h-5" />
        <span>
          {isGenerating ? "Generating AI Message..." : "Generate AI Message"}
        </span>
      </button>
    </div>
  );
};
