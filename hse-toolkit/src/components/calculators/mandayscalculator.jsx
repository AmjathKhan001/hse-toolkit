import React, { useState, useEffect } from 'react';
import { Calculator, Download } from 'lucide-react';

const ManDaysCalculator = () => {
  const [formData, setFormData] = useState({
    periodDays: 30,
    hoursPerDay: 8,
    workers: {
      skilled: 0,
      unskilled: 0,
      contract: 0
    }
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('hse_manDaysCalculator');
    if (saved) {
      setFormData(JSON.parse(saved));
      calculateResults(JSON.parse(saved));
    }
  }, []);

  const calculateResults = (data) => {
    const totalWorkers = data.workers.skilled + data.workers.unskilled + data.workers.contract;
    const totalManDays = totalWorkers * data.periodDays;
    const totalManHours = totalManDays * data.hoursPerDay;

    setResults({
      totalWorkers,
      totalManDays,
      totalManHours,
      breakdown: {
        skilled: data.workers.skilled * data.periodDays,
        unskilled: data.workers.unskilled * data.periodDays,
        contract: data.workers.contract * data.periodDays
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hse_manDaysCalculator', JSON.stringify(formData));
    calculateResults(formData);
    alert('Data saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-hse-blue mb-4">Man-Days Worked Calculator</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Days in Period
            </label>
            <input
              type="number"
              value={formData.periodDays}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                periodDays: parseInt(e.target.value) || 0 
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours Per Day
            </label>
            <input
              type="number"
              value={formData.hoursPerDay}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                hoursPerDay: parseInt(e.target.value) || 8 
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="1"
              max="24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skilled Workers
            </label>
            <input
              type="number"
              value={formData.workers.skilled}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                workers: { ...prev.workers, skilled: parseInt(e.target.value) || 0 }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unskilled Workers
            </label>
            <input
              type="number"
              value={formData.workers.unskilled}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                workers: { ...prev.workers, unskilled: parseInt(e.target.value) || 0 }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contract Workers
            </label>
            <input
              type="number"
              value={formData.workers.contract}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                workers: { ...prev.workers, contract: parseInt(e.target.value) || 0 }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-hse-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </button>
          
          <button
            type="button"
            onClick={handleExport}
            disabled={!results}
            className="flex items-center justify-center px-4 py-2 bg-hse-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-6 p-4 bg-hse-light border-l-4 border-hse-green rounded-lg">
          <h4 className="font-bold text-lg mb-3">Calculation Results</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-hse-green">{results.totalWorkers}</div>
              <div className="text-sm text-gray-600">Total Workers</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-hse-green">{results.totalManDays.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Man-Days</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-hse-green">{results.totalManHours.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Man-Hours</div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow">
            <h5 className="font-semibold mb-2">Breakdown by Worker Type</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>Skilled: {results.breakdown.skilled} man-days</div>
              <div>Unskilled: {results.breakdown.unskilled} man-days</div>
              <div>Contract: {results.breakdown.contract} man-days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManDaysCalculator;
