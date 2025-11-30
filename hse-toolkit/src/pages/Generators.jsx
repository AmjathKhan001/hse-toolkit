import React from 'react';
import JSAEditor from '../components/generators/JSAEditor';
import HIRAGenerator from '../components/generators/HIRAGenerator';

const Generators = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-6">
        <h2 className="text-2xl font-bold text-dark-gray mb-4 border-b pb-2">
          HSE Generators and Reporting Tools
        </h2>
        <p className="text-gray-600 mb-6">
          Create professional safety documentation, risk assessments, and audit-ready reports.
        </p>
        
        <div className="space-y-8">
          <JSAEditor />
          <HIRAGenerator />
        </div>
      </div>
    </div>
  );
};

export default Generators;