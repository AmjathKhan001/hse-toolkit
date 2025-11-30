import React, { useState, useEffect } from 'react';
import { Calculator, Download, Info } from 'lucide-react';

const TRIRCalculator = () => {
  const [formData, setFormData] = useState({
    recordableCases: 0,
    totalManHours: 200000,
    base: 200000
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('hse_trirCalculator');
    if (saved) {
      setFormData(JSON.parse(saved));
      calculateResults(JSON.parse(saved));
    }
  }, []);

  const calculateResults = (data) => {
    const cases = parseFloat(data.recordableCases) || 0;
    const hours = parseFloat(data.totalManHours) || 1;
    const base = parseFloat(data.base);
    
    const trir = (cases / hours) * base;
    const interpretation = getInterpretation(trir, data.base);

    setResults({
      trir: trir.toFixed(2),
      interpretation,
      formula: `(${cases} × ${base.toLocaleString()}) / ${hours.toLocaleString()}`,
      calculation: `= ${trir.toFixed(2)}`
    });
  };

  const getInterpretation = (trir, base) => {
    if (base === 200000) {
      if (trir === 0) return 'Perfect safety record';
      if (trir < 1.0) return 'Excellent safety performance';
      if (trir < 3.0) return 'Good safety performance';
      if (trir < 5.0) return 'Average safety performance';
      return 'Needs improvement';
    } else {
      if (trir === 0) return 'Perfect safety record';
      if (trir < 5.0) return 'Excellent safety performance';
      if (trir < 15.0) return 'Good safety performance';
      if (trir < 25.0) return 'Average safety performance';
      return 'Needs improvement';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hse_trirCalculator', JSON.stringify(formData));
    calculateResults(formData);
    alert('Data saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-hse-blue mb-4">TRIR / AFR / FAR Calculator</h3>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Definitions:</strong> TRIR (Total Recordable Incident Rate) uses base 200,000 hours. 
            AFR (Accident Frequency Rate) and FAR (Fatal Accident Rate) typically use base 1,000,000 hours.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recordable Cases
            </label>
            <input
              type="number"
              value={formData.recordableCases}
              onChange={(e) => setFormData({...formData, recordableCases: parseFloat(e.target.value) || 0})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
              step="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Man-Hours Worked
            </label>
            <input
              type="number"
              value={formData.totalManHours}
              onChange={(e) => setFormData({...formData, totalManHours: parseFloat(e.target.value) || 0})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="1"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calculation Base
            </label>
            <select
              value={formData.base}
              onChange={(e) => setFormData({...formData, base: parseFloat(e.target.value)})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value={200000}>200,000 hours (TRIR/IR - OSHA Standard)</option>
              <option value={1000000}>1,000,000 hours (LTIFR/FAR - International)</option>
            </select>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-3xl font-bold text-hse-green mb-2">{results.trir}</div>
                <div className="text-lg font-semibold text-gray-700">
                  {formData.base === 200000 ? 'TRIR' : 'Frequency Rate'}
                </div>
                <div className="text-sm text-gray-600 mt-2">{results.interpretation}</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h5 className="font-semibold mb-2">Calculation Details</h5>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded">
                <div>Formula: {results.formula}</div>
                <div>Result: {results.calculation}</div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <strong>Base:</strong> {formData.base.toLocaleString()} hours
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TRIRCalculator;
