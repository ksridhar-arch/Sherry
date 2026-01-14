
import React from 'react';
import { ItemHighlight } from '../types';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface ItemTableProps {
  items: ItemHighlight[];
}

const ItemTable: React.FC<ItemTableProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-900">SKU Level Performance</h4>
        <button className="text-sm text-blue-600 font-medium hover:underline">View All Items</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Name / SKU</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sales (Wow)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Insights</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-400 font-mono uppercase">{item.sku || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">${item.sales.toLocaleString()}</div>
                  <div className={`flex items-center text-xs font-medium ${item.wowChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.wowChange > 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {Math.abs(item.wowChange)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'Winning Buy Box' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'Price Suppressed' ? 'bg-rose-50 text-rose-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center group cursor-pointer">
                    <span className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{item.details || 'Maintaining strong organic rank.'}</span>
                    <Info className="w-3.5 h-3.5 ml-2 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
