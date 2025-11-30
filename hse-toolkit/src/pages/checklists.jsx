import React from 'react';
import constructionchecklist from '../components/checklists/constructionchecklist';

const Checklists = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-6">
        <h2 className="text-2xl font-bold text-dark-gray mb-4 border-b pb-2">
          Compliance Checklists and Inspection Forms
        </h2>
        <p className="text-gray-600 mb-6">
          Conduct comprehensive safety inspections with standardized checklists.
        </p>
        
        <div className="space-y-8">
          <constructionchecklist />
        </div>
      </div>
    </div>
  );
};

export default Checklists;
