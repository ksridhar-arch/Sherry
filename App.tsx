
import React, { useState, useEffect } from 'react';
import { Download, Upload, BarChart3, LayoutDashboard, Settings, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import KPIStats from './components/KPIStats';
import PerformanceCharts from './components/PerformanceCharts';
import ItemTable from './components/ItemTable';
import InsightSection from './components/InsightSection';
import { PerformanceData, InsightReport } from './types';
import { generateInsights } from './services/geminiService';

// Mock initial data based on the user's provided image
const MOCK_DATA: PerformanceData = {
  timeframe: 'Oct 1 - Oct 31',
  metrics: [
    { label: 'Retail Sales', value: 266000, change: -10, secondaryChange: 31.3, format: 'currency', category: 'Sales' },
    { label: 'Buy Box %', value: 77, change: -3.3, format: 'percentage', category: 'Sales' },
    { label: 'AOV', value: 102.60, change: -9.5, format: 'currency', category: 'Sales' },
    { label: 'Conversion Rate', value: 1.74, change: -8.3, format: 'percentage', category: 'Traffic' },
    { label: 'Page Views', value: 149200, change: 8.2, format: 'number', category: 'Traffic' },
    { label: 'Ad Spend', value: 24000, change: 70, format: 'currency', category: 'Ads' },
    { label: 'Ad Sales', value: 92800, change: 5.3, format: 'currency', category: 'Ads' },
    { label: 'ROAS', value: 3.9, change: -38, format: 'number', category: 'Ads' },
  ],
  itemHighlights: [
    { name: 'Center Drive Needlenose Black', sales: 18800, wowChange: 5, status: 'Winning Buy Box' },
    { name: 'Strongarm Coyote Brown', sales: 17500, wowChange: 17.5, status: 'Active' },
    { name: 'ComplEAT Cook Set', sales: 16000, wowChange: -28.5, status: 'Active' },
    { name: 'MP600 Needle Nose Stainless', sku: 'B0006G5F1M', sales: 15500, wowChange: 12.5, status: 'Winning Buy Box' },
    { name: 'Strongarm Magnacut', sales: 14000, wowChange: 33, status: 'Active' },
    { name: 'Diesel Multi-tool', sales: 13500, wowChange: -7, status: 'Active' },
    { name: 'MP600 Bladeless', sales: 7500, wowChange: 14.5, status: 'Price Suppressed', details: 'Price is currently suppressed by Amazon.' },
  ],
  historicalData: [
    { date: 'Jun', sales: 210000, adSpend: 12000, roas: 4.8 },
    { date: 'Jul', sales: 245000, adSpend: 14000, roas: 5.1 },
    { date: 'Aug', sales: 230000, adSpend: 13500, roas: 4.2 },
    { date: 'Sep', sales: 295000, adSpend: 14100, roas: 6.2 },
    { date: 'Oct', sales: 266000, adSpend: 24000, roas: 3.9 },
    { date: 'Nov (Proj)', sales: 310000, adSpend: 28000, roas: 4.5 },
  ]
};

const App: React.FC = () => {
  const [data, setData] = useState<PerformanceData>(MOCK_DATA);
  const [insights, setInsights] = useState<InsightReport | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const handleDataRequest = async () => {
    setLoadingInsights(true);
    try {
      const result = await generateInsights(data);
      setInsights(result);
    } catch (error) {
      console.error("Failed to generate insights", error);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    handleDataRequest();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Processing ${file.name}... In a real app, we would parse Excel/CSV here.`);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">BrandPulse</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button className="flex items-center space-x-3 w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold text-sm transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all">
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-sm transition-all">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
              <div>
                <p className="text-xs font-bold text-gray-900">Gerber Gear</p>
                <p className="text-[10px] text-gray-400">Brand Admin</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Executive Report</h1>
              <p className="text-sm text-gray-500 font-medium">Performance summary for {data.timeframe}</p>
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Upload Report</span>
                <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv,.xlsx" />
              </label>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {/* AI Insights Section */}
          <InsightSection insights={insights} isLoading={loadingInsights} />

          {/* Primary Stats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Main Performance KPIs</h3>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Month over Month</span>
            </div>
            <KPIStats metrics={data.metrics} />
          </div>

          {/* Charts Row */}
          <PerformanceCharts data={data.historicalData} />

          {/* Item Performance */}
          <ItemTable items={data.itemHighlights} />
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center border-t border-gray-100 mt-12 space-y-4">
          <div className="flex items-center space-x-2 opacity-50">
            <BarChart3 className="w-5 h-5" />
            <span className="font-bold">BrandPulse AI</span>
          </div>
          <p className="text-sm text-gray-400">© 2024 Performance Analytics Dashboard. All data processed securely via Gemini API.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
