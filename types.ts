
export interface PerformanceMetric {
  label: string;
  value: string | number;
  change: number;
  secondaryChange?: number;
  format: 'currency' | 'percentage' | 'number';
  category: 'Sales' | 'Traffic' | 'Ads' | 'Inventory';
}

export interface ItemHighlight {
  name: string;
  sku?: string;
  sales: number;
  wowChange: number;
  status?: 'Price Suppressed' | 'Winning Buy Box' | 'Out of Stock' | 'Active';
  details?: string;
}

export interface PerformanceData {
  timeframe: string;
  metrics: PerformanceMetric[];
  itemHighlights: ItemHighlight[];
  historicalData: {
    date: string;
    sales: number;
    adSpend: number;
    roas: number;
  }[];
}

export interface InsightReport {
  executiveSummary: string;
  keyPositiveDrivers: string[];
  riskFactors: string[];
  strategicRecommendations: string[];
}
