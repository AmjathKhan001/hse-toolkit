import React from 'react';
import SafeManHoursCalculator from '../components/calculators/SafeManHoursCalculator';
import TRIRCalculator from '../components/calculators/TRIRCalculator';
import ManDaysCalculator from '../components/calculators/ManDaysCalculator';

const Calculators = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-6">
        <h2 className="text-2xl font-bold text-dark-gray mb-4 border-b pb-2">
          HSE KPI and Frequency Rate Calculations
        </h2>
        <p className="text-gray-600 mb-6">
          Calculate essential safety metrics and performance indicators. All calculations follow industry standards.
        </p>
        
        <div className="space-y-8">
          <SafeManHoursCalculator />
          <TRIRCalculator />
          <ManDaysCalculator />
        </div>
      </div>
    </div>
  );
};

export default Calculators;