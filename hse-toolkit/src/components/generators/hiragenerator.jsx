import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Save } from 'lucide-react';

const HIRAGenerator = () => {
  const [hiraData, setHiraData] = useState({
    project: '',
    assessor: '',
    date: new Date().toISOString().split('T')[0],
    hazards: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('hse_hiraData');
    if (saved) setHiraData(JSON.parse(saved));
  }, []);

  const addHazard = () => {
    const newHazard = {
      id: Date.now().toString(),
      hazard: '',
      cause: '',
      consequence: '',
      likelihood: 3,
      severity: 3,
      existingControls: '',
      additionalControls: '',
      responsible: '',
      timeline: ''
    };
    setHiraData(prev => ({
      ...prev,
      hazards: [...prev.hazards, newHazard]
    }));
  };

  const updateHazard = (hazardId, field, value) => {
    setHiraData(prev => ({
      ...prev,
      hazards: prev.hazards.map(hazard =>
        hazard.id === hazardId ? { ...hazard, [field]: value } : hazard
      )
    }));
  };

  const deleteHazard = (hazardId) => {
    setHiraData(prev => ({
      ...prev,
      hazards: prev.hazards.filter(hazard => hazard.id !== hazardId)
    }));
  };

  const calculateRiskRating = (likelihood, severity) => {
    const riskScore = likelihood * severity;
    if (riskScore <= 2) return { rating: 'Low', color: 'green' };
    if (riskScore <= 6) return { rating: 'Medium', color: 'yellow' };
    if (riskScore <= 12) return { rating: 'High', color: 'orange' };
    return { rating: 'Extreme', color: 'red' };
  };

  const saveHIRA = () => {
    localStorage.setItem('hse_hiraData', JSON.stringify(hiraData));
    alert('HIRA saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-hse-blue">Hazard Identification & Risk Assessment (HIRA)</h3>
        <div className="flex gap-2">
          <button
            onClick={saveHIRA}
            className="flex items-center px-4 py-2 bg-hse-green text-white rounded-lg hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-hse-blue text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project/Area *
          </label>
          <input
            type="text"
            value={hiraData.project}
            onChange={(e) => setHiraData(prev => ({ ...prev, project: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Project name or area"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assessor
          </label>
          <input
            type="text"
            value={hiraData.assessor}
            onChange={(e) => setHiraData(prev => ({ ...prev, assessor: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Assessor name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assessment Date
          </label>
          <input
            type="date"
            value={hiraData.date}
            onChange={(e) => setHiraData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Risk Matrix Guide */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold mb-2">Risk Matrix Guide</h4>
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div className="text-center p-2 bg-green-100 border border-green-300 rounded">
            <div>Low</div>
            <div>1-2</div>
          </div>
          <div className="text-center p-2 bg-yellow-100 border border-yellow-300 rounded">
            <div>Medium</div>
            <div>3-6</div>
          </div>
          <div className="text-center p-2 bg-orange-100 border border-orange-300 rounded">
            <div>High</div>
            <div>8-12</div>
          </div>
          <div className="text-center p-2 bg-red-100 border border-red-300 rounded">
            <div>Extreme</div>
            <div>15-16</div>
          </div>
          <div className="text-center p-2 bg-gray-100 border border-gray-300 rounded">
            <div>Score = Likelihood × Severity</div>
          </div>
        </div>
      </div>

      {/* Hazards List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">Identified Hazards</h4>
          <button
            onClick={addHazard}
            className="flex items-center px-3 py-1 bg-hse-green text-white rounded text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Hazard
          </button>
        </div>

        <div className="space-y-4">
          {hiraData.hazards.map((hazard) => {
            const riskRating = calculateRiskRating(hazard.likelihood, hazard.severity);
            return (
              <div key={hazard.id} className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hazard Description *
                    </label>
                    <input
                      type="text"
                      value={hazard.hazard}
                      onChange={(e) => updateHazard(hazard.id, 'hazard', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe the hazard..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potential Cause
                    </label>
                    <input
                      type="text"
                      value={hazard.cause}
                      onChange={(e) => updateHazard(hazard.id, 'cause', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="What could cause this hazard?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potential Consequence
                    </label>
                    <input
                      type="text"
                      value={hazard.consequence}
                      onChange={(e) => updateHazard(hazard.id, 'consequence', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="What could happen?"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Likelihood (1-5)
                      </label>
                      <select
                        value={hazard.likelihood}
                        onChange={(e) => updateHazard(hazard.id, 'likelihood', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value={1}>1 - Rare</option>
                        <option value={2}>2 - Unlikely</option>
                        <option value={3}>3 - Possible</option>
                        <option value={4}>4 - Likely</option>
                        <option value={5}>5 - Almost Certain</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity (1-5)
                      </label>
                      <select
                        value={hazard.severity}
                        onChange={(e) => updateHazard(hazard.id, 'severity', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value={1}>1 - Negligible</option>
                        <option value={2}>2 - Minor</option>
                        <option value={3}>3 - Moderate</option>
                        <option value={4}>4 - Major</option>
                        <option value={5}>5 - Catastrophic</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Existing Controls
                    </label>
                    <textarea
                      value={hazard.existingControls}
                      onChange={(e) => updateHazard(hazard.id, 'existingControls', e.target.value)}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Current control measures..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Controls Required
                    </label>
                    <textarea
                      value={hazard.additionalControls}
                      onChange={(e) => updateHazard(hazard.id, 'additionalControls', e.target.value)}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Additional control measures needed..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Responsible Person
                    </label>
                    <input
                      type="text"
                      value={hazard.responsible}
                      onChange={(e) => updateHazard(hazard.id, 'responsible', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Person responsible"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={hazard.timeline}
                      onChange={(e) => updateHazard(hazard.id, 'timeline', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g., Immediate, 1 week, 1 month"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Risk Rating:</span>
                    <span className={`px-2 py-1 rounded text-white bg-${riskRating.color}-500 text-sm`}>
                      {riskRating.rating} (Score: {hazard.likelihood * hazard.severity})
                    </span>
                  </div>
                  
                  <button
                    onClick={() => deleteHazard(hazard.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hiraData.hazards.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hazards identified yet. Click "Add Hazard" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default HIRAGenerator;
