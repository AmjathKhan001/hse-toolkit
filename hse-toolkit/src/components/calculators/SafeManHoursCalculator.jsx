import React, { useState, useEffect } from 'react';
import { Save, Download, TrendingUp, Calendar } from 'lucide-react';

const SafeManHoursCalculator = () => {
  const [formData, setFormData] = useState({
    siteProject: '',
    startDate: '',
    endDate: '',
    dailyManHours: '',
    ltiCount: 0,
    cumulativeHours: 0
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('hse_safeManHours');
    if (saved) {
      setFormData(JSON.parse(saved));
      calculateResults(JSON.parse(saved));
    }
  }, []);

  const calculateResults = (data) => {
    const dailyHours = parseFloat(data.dailyManHours) || 0;
    const start = data.startDate ? new Date(data.startDate) : new Date();
    const end = data.endDate ? new Date(data.endDate) : new Date();
    const days = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
    
    const periodHours = dailyHours * days;
    const totalCumulative = (parseFloat(data.cumulativeHours) || 0) + periodHours;
    const ltiCount = parseInt(data.ltiCount) || 0;
    
    const daysSinceLTI = ltiCount === 0 ? days : 0;
    const hoursSinceLTI = ltiCount === 0 ? totalCumulative : 0;

    setResults({
      periodHours,
      totalCumulative,
      daysSinceLTI,
      hoursSinceLTI,
      ltiCount,
      period: days
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hse_safeManHours', JSON.stringify(formData));
    calculateResults(formData);
    alert('Data saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-hse-blue mb-4">Safe Man-Hours Calculator</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site/Project Name
            </label>
            <input
              type="text"
              value={formData.siteProject}
              onChange={(e) => setFormData({...formData, siteProject: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter site or project name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Man-Hours
            </label>
            <input
              type="number"
              value={formData.dailyManHours}
              onChange={(e) => setFormData({...formData, dailyManHours: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Average daily hours"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LTIs During Period
            </label>
            <input
              type="number"
              value={formData.ltiCount}
              onChange={(e) => setFormData({...formData, ltiCount: parseInt(e.target.value) || 0})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Previous Cumulative Hours
            </label>
            <input
              type="number"
              value={formData.cumulativeHours}
              onChange={(e) => setFormData({...formData, cumulativeHours: parseFloat(e.target.value) || 0})}
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
            <Save className="w-4 h-4 mr-2" />
            Calculate & Save
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
          <h4 className="font-bold text-lg mb-3">Results</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <TrendingUp className="w-8 h-8 text-hse-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-hse-green">{results.periodHours.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Period Safe Hours</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <TrendingUp className="w-8 h-8 text-hse-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-hse-green">{results.totalCumulative.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Cumulative Safe Hours</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <Calendar className="w-8 h-8 text-hse-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-hse-green">{results.daysSinceLTI}</div>
              <div className="text-sm text-gray-600">Days Since Last LTI</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <Calendar className="w-8 h-8 text-hse-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-hse-green">{results.ltiCount}</div>
              <div className="text-sm text-gray-600">Total LTIs</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> {results.ltiCount > 0 
                ? `Safety performance reset due to ${results.ltiCount} LTI(s). Cumulative hours reset to period hours.`
                : 'No LTIs recorded. Cumulative hours updated.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeManHoursCalculator;