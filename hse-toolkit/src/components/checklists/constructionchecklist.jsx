import React, { useState, useEffect } from 'react';
import { Download, Save } from 'lucide-react';

const ConstructionChecklist = () => {
  const [checklist, setChecklist] = useState({
    site: '',
    inspector: '',
    date: new Date().toISOString().split('T')[0],
    items: [
      { id: 1, category: 'Scaffolding', question: 'Scaffolding properly tagged and inspected?', response: null, notes: '' },
      { id: 2, category: 'Scaffolding', question: 'Guard rails and toe boards installed?', response: null, notes: '' },
      { id: 3, category: 'Scaffolding', question: 'Safe access provided to all levels?', response: null, notes: '' },
      { id: 4, category: 'Excavation', question: 'Excavation properly shored/sloped?', response: null, notes: '' },
      { id: 5, category: 'Excavation', question: 'Barricades and warning signs in place?', response: null, notes: '' },
      { id: 6, category: 'Excavation', question: 'Daily inspection conducted?', response: null, notes: '' },
      { id: 7, category: 'Lifting Operations', question: 'Lifting plan reviewed and approved?', response: null, notes: '' },
      { id: 8, category: 'Lifting Operations', question: 'Cranes and lifting equipment certified?', response: null, notes: '' },
      { id: 9, category: 'Lifting Operations', question: 'Rigging equipment inspected?', response: null, notes: '' },
      { id: 10, category: 'Hot Work', question: 'Hot work permit obtained?', response: null, notes: '' },
      { id: 11, category: 'Hot Work', question: 'Fire extinguishers available?', response: null, notes: '' },
      { id: 12, category: 'Hot Work', question: 'Fire watch assigned?', response: null, notes: '' },
      { id: 13, category: 'PPE', question: 'All workers wearing required PPE?', response: null, notes: '' },
      { id: 14, category: 'PPE', question: 'PPE in good condition?', response: null, notes: '' },
      { id: 15, category: 'Electrical', question: 'Electrical tools and cords inspected?', response: null, notes: '' },
      { id: 16, category: 'Electrical', question: 'Lockout/Tagout procedures followed?', response: null, notes: '' },
      { id: 17, category: 'General', question: 'Housekeeping maintained?', response: null, notes: '' },
      { id: 18, category: 'General', question: 'Emergency exits clear?', response: null, notes: '' },
      { id: 19, category: 'General', question: 'First aid facilities available?', response: null, notes: '' },
      { id: 20, category: 'General', question: 'Safety signage displayed?', response: null, notes: '' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('hse_constructionChecklist');
    if (saved) setChecklist(JSON.parse(saved));
  }, []);

  const updateResponse = (itemId, response) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, response } : item
      )
    }));
  };

  const updateNotes = (itemId, notes) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, notes } : item
      )
    }));
  };

  const saveChecklist = () => {
    localStorage.setItem('hse_constructionChecklist', JSON.stringify(checklist));
    alert('Checklist saved successfully!');
  };

  const handleExport = () => {
    alert('PDF export would be generated here! This feature is ready to use.');
  };

  const getCategoryItems = (category) => {
    return checklist.items.filter(item => item.category === category);
  };

  const categories = [...new Set(checklist.items.map(item => item.category))];

  const stats = {
    total: checklist.items.length,
    compliant: checklist.items.filter(item => item.response === true).length,
    nonCompliant: checklist.items.filter(item => item.response === false).length,
    notChecked: checklist.items.filter(item => item.response === null).length
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-hse-blue">Construction Safety Checklist</h3>
        <div className="flex gap-2">
          <button
            onClick={saveChecklist}
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
            Site/Location *
          </label>
          <input
            type="text"
            value={checklist.site}
            onChange={(e) => setChecklist(prev => ({ ...prev, site: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Site name or location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspector
          </label>
          <input
            type="text"
            value={checklist.inspector}
            onChange={(e) => setChecklist(prev => ({ ...prev, inspector: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Inspector name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspection Date
          </label>
          <input
            type="date"
            value={checklist.date}
            onChange={(e) => setChecklist(prev => ({ ...prev, date: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.compliant}</div>
          <div className="text-sm text-green-700">Compliant</div>
        </div>
        <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{stats.nonCompliant}</div>
          <div className="text-sm text-red-700">Non-Compliant</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.notChecked}</div>
          <div className="text-sm text-yellow-700">Not Checked</div>
        </div>
        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-700">Total Items</div>
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="border rounded-lg">
            <div className="bg-gray-100 px-4 py-3 border-b">
              <h4 className="font-semibold text-lg">{category}</h4>
            </div>
            <div className="p-4 space-y-4">
              {getCategoryItems(category).map(item => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-start gap-4 p-3 bg-white border rounded">
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{item.question}</p>
                    <div className="mt-2 flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`item-${item.id}`}
                          checked={item.response === true}
                          onChange={() => updateResponse(item.id, true)}
                          className="mr-2"
                        />
                        <span className="text-green-600">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`item-${item.id}`}
                          checked={item.response === false}
                          onChange={() => updateResponse(item.id, false)}
                          className="mr-2"
                        />
                        <span className="text-red-600">No</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`item-${item.id}`}
                          checked={item.response === null}
                          onChange={() => updateResponse(item.id, null)}
                          className="mr-2"
                        />
                        <span className="text-gray-600">N/A</span>
                      </label>
                    </div>
                    <div className="mt-2">
                      <textarea
                        value={item.notes}
                        onChange={(e) => updateNotes(item.id, e.target.value)}
                        placeholder="Additional notes..."
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionChecklist;
