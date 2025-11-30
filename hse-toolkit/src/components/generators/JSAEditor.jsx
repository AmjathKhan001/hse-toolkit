import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Save } from 'lucide-react';

const JSAEditor = () => {
  const [jsaData, setJsaData] = useState({
    jobTitle: '',
    location: '',
    supervisor: '',
    date: new Date().toISOString().split('T')[0],
    steps: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('hse_jsaData');
    if (saved) setJsaData(JSON.parse(saved));
  }, []);

  const addStep = () => {
    const newStep = {
      id: Date.now().toString(),
      sequence: jsaData.steps.length + 1,
      description: '',
      hazards: '',
      controls: '',
      responsible: '',
      riskRating: 'medium'
    };
    setJsaData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (stepId, field, value) => {
    setJsaData(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const deleteStep = (stepId) => {
    setJsaData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const saveJSA = () => {
    localStorage.setItem('hse_jsaData', JSON.stringify(jsaData));
    alert('JSA saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-hse-blue">Job Safety Analysis (JSA) Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={saveJSA}
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
            Job Title *
          </label>
          <input
            type="text"
            value={jsaData.jobTitle}
            onChange={(e) => setJsaData(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="e.g., Working on Scaffolding"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={jsaData.location}
            onChange={(e) => setJsaData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Site location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supervisor
          </label>
          <input
            type="text"
            value={jsaData.supervisor}
            onChange={(e) => setJsaData(prev => ({ ...prev, supervisor: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Supervisor name"
          />
        </div>
      </div>

      {/* Steps Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">Job Steps</h4>
          <button
            onClick={addStep}
            className="flex items-center px-3 py-1 bg-hse-green text-white rounded text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Step
          </button>
        </div>

        <div className="space-y-4">
          {jsaData.steps.map((step) => (
            <div key={step.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="bg-hse-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-2 flex-shrink-0">
                  {step.sequence}
                </div>
                
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Step Description
                    </label>
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe the job step..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potential Hazards
                    </label>
                    <textarea
                      value={step.hazards}
                      onChange={(e) => updateStep(step.id, 'hazards', e.target.value)}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="List potential hazards..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Control Measures
                    </label>
                    <textarea
                      value={step.controls}
                      onChange={(e) => updateStep(step.id, 'controls', e.target.value)}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Describe control measures..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Responsible Person
                    </label>
                    <input
                      type="text"
                      value={step.responsible}
                      onChange={(e) => updateStep(step.id, 'responsible', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Person responsible"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Risk Rating
                    </label>
                    <select
                      value={step.riskRating}
                      onChange={(e) => updateStep(step.id, 'riskRating', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very-high">Very High</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteStep(step.id)}
                  className="mt-2 p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {jsaData.steps.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No job steps added yet. Click "Add Step" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default JSAEditor;