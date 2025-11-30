import React from 'react';
import { Link } from 'react-router-dom';
// The import statement is correct: ListChecks
import { Calculator, FileText, ListChecks, Download, Shield, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-hse-green to-green-600 text-white p-6 rounded-lg shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to HSE Toolkit</h1>
        <p className="text-xl mb-4">The ultimate audit-ready tools for safety metrics, documentation, and compliance</p>
        <p className="text-lg font-semibold">
          ✨ <strong>Support High-Performance Safety Tools:</strong> Completely free and ad-light.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-t-4 border-hse-blue">
        <h2 className="text-2xl font-bold text-dark-gray mb-4">🚀 How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-hse-light rounded-lg">
            <Calculator className="w-12 h-12 text-hse-blue mx-auto mb-2" />
            <h3 className="font-semibold text-lg mb-2">1. Enter Your Data</h3>
            <p className="text-sm text-gray-600">Site/project, hours, hazards, or training details—only what's needed.</p>
          </div>
          <div className="p-4 bg-hse-light rounded-lg">
            <TrendingUp className="w-12 h-12 text-hse-blue mx-auto mb-2" />
            <h3 className="font-semibold text-lg mb-2">2. Generate Results</h3>
            <p className="text-sm text-gray-600">See KPIs, risk ratings, and summaries instantly. Validate with your standards.</p>
          </div>
          <div className="p-4 bg-hse-light rounded-lg">
            <Download className="w-12 h-12 text-hse-blue mx-auto mb-2" />
            <h3 className="font-semibold text-lg mb-2">3. Export & Share</h3>
            <p className="text-sm text-gray-600">Download clean <strong>A4 PDFs</strong> for audits and client reporting. No logins required.</p>
          </div>
        </div>
      </div>

      {/* Tool Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/calculators" className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-hse-green hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-3">
            <Calculator className="w-8 h-8 text-hse-green mr-3" />
            <h3 className="text-xl font-bold text-dark-gray">KPIs & Calculators</h3>
          </div>
          <p className="text-gray-600">Calculate safety metrics, frequency rates, man-hours, and performance indicators.</p>
          <ul className="mt-3 text-sm text-gray-500 space-y-1">
            <li>• Safe Man-Hours Calculator</li>
            <li>• TRIR/AFR/FAR Calculator</li>
            <li>• Frequency & Severity Rates</li>
            <li>• Man-Days Worked</li>
          </ul>
        </Link>

        <Link to="/generators" className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-hse-blue hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-3">
            <FileText className="w-8 h-8 text-hse-blue mr-3" />
            <h3 className="text-xl font-bold text-dark-gray">Documentation</h3>
          </div>
          <p className="text-gray-600">Generate professional reports, JSAs, risk assessments, and safety documentation.</p>
          <ul className="mt-3 text-sm text-gray-500 space-y-1">
            <li>• JSA Editor & Generator</li>
            <li>• HIRA Reports</li>
            <li>• Permit-to-Work</li>
            <li>• Daily/Weekly Reports</li>
          </ul>
        </Link>

        <Link to="/checklists" className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-amazon-orange hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-3">
            {/* THIS IS THE FIX: Changed 'Checklist' to 'ListChecks' */}
            <ListChecks className="w-8 h-8 text-amazon-orange mr-3" />
            <h3 className="text-xl font-bold text-dark-gray">Checklists</h3>
          </div>
          <p className="text-gray-600">Conduct safety inspections with comprehensive checklists for various work environments.</p>
          <ul className="mt-3 text-sm text-gray-500 space-y-1">
            <li>• Construction Safety</li>
            <li>• Factory/Manufacturing</li>
            <li>• Office Safety</li>
            <li>• Safety Induction</li>
          </ul>
        </Link>
      </div>

      {/* Features Highlight */}
      <div className="bg-hse-light p-6 rounded-lg border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-green-800">✅ Key Features</h3>
            <ul className="space-y-2 text-green-700">
              <li>• All data stays in your browser</li>
              <li>• Professional A4 PDF exports</li>
              <li>• Mobile-friendly design</li>
              <li>• No registration required</li>
              <li>• Audit-ready reports</li>
              <li>• Industry-standard calculations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-800">🛡️ Safety Standards</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• OSHA 1904 Compliance</li>
              <li>• ISO 45001 Alignment</li>
              <li>• ILO OSH Guidelines</li>
              <li>• Industry Best Practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
