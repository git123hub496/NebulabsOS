import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Upload, Image as ImageIcon, Loader2, Search, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image || isLoading) return;

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            { text: "Analyze this image in detail. What do you see? Provide a futuristic, technical breakdown." },
            { inlineData: { mimeType: "image/png", data: base64Data } }
          ]
        }
      });

      setAnalysis(response.text || "Analysis failed.");
    } catch (error) {
      console.error(error);
      setAnalysis("Error: Neural link interrupted. Could not analyze visual data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-light tracking-tight text-white/90 flex items-center justify-center gap-2">
            <Search className="text-indigo-400" size={24} />
            Visual Intelligence
          </h2>
          <p className="text-white/50 text-sm">Upload visual data for neural processing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all group overflow-hidden relative",
              image ? "border-solid border-indigo-500/30" : ""
            )}
          >
            {image ? (
              <img src={image} alt="Upload" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-white/40 group-hover:text-indigo-400 transition-colors" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white/70">Drop image here</p>
                  <p className="text-xs text-white/40">or click to browse</p>
                </div>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {/* Analysis Area */}
          <div className="flex flex-col gap-4">
            <button
              onClick={analyzeImage}
              disabled={!image || isLoading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Visual Data
                </>
              )}
            </button>

            <div className="flex-1 glass-dark rounded-xl p-6 border border-white/10 overflow-auto min-h-[300px]">
              {analysis ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Neural Report
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 font-light whitespace-pre-wrap">
                    {analysis}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white/30 gap-3">
                  <ImageIcon size={48} strokeWidth={1} />
                  <p className="text-sm">Awaiting visual input...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
