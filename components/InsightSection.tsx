
import React from 'react';
import { InsightReport } from '../types';
import { Sparkles, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface InsightSectionProps {
  insights: InsightReport | null;
  isLoading: boolean;
}

const InsightSection: React.FC<InsightSectionProps> = ({ insights, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center animate-pulse">
        <Sparkles className="w-8 h-8 text-blue-300 mb-4 animate-bounce" />
        <p className="text-gray-400 font-medium">Analyzing retail performance metrics...</p>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Executive Performance Insights</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {insights.executiveSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="font-bold">Drivers for Success</h4>
          </div>
          <ul className="space-y-3">
            {insights.keyPositiveDrivers.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-rose-600">
            <AlertCircle className="w-5 h-5" />
            <h4 className="font-bold">Risk Factors</h4>
          </div>
          <ul className="space-y-3">
            {insights.riskFactors.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-blue-600">
            <Lightbulb className="w-5 h-5" />
            <h4 className="font-bold">Recommendations</h4>
          </div>
          <ul className="space-y-3">
            {insights.strategicRecommendations.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightSection;
