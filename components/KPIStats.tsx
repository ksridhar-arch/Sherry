
import React from 'react';
import { PerformanceMetric } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPIStatsProps {
  metrics: PerformanceMetric[];
}

const KPIStats: React.FC<KPIStatsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const isPositive = metric.change > 0;
        const isNeutral = metric.change === 0;

        return (
          <div key={index} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-gray-500">{metric.label}</p>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                isNeutral ? 'bg-gray-100 text-gray-600' :
                isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {isNeutral ? <Minus className="w-3 h-3 mr-1" /> :
                 isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {metric.format === 'currency' ? `$${(metric.value as number).toLocaleString()}` :
                 metric.format === 'percentage' ? `${metric.value}%` :
                 metric.value.toString()}
              </h3>
              {metric.secondaryChange && (
                <span className="text-xs text-gray-400 font-normal">
                  ({metric.secondaryChange > 0 ? '+' : ''}{metric.secondaryChange}% YoY)
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(Math.max(Math.abs(metric.change) * 2, 10), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPIStats;
