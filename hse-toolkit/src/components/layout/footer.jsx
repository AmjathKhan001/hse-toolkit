import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center no-print">
      <div className="container mx-auto">
        <p className="text-sm mb-3">&copy; {new Date().getFullYear()} HSE Toolkit. All rights reserved.</p>
        
        <div className="mb-4 p-4 bg-gray-700 rounded-lg">
          <h4 className="font-bold text-dark-gray mb-2">💡 Methodology</h4>
          <p className="text-gray-300 mb-2 text-sm">
            Calculations follow commonly used HSE practices. Always confirm with your organization's definitions and local regulations.
          </p>
          <p className="text-gray-300 mb-2 text-sm">
            <strong>References:</strong> OSHA 1904, ISO 45001, ILO OSH.
          </p>
          <p className="text-gray-300 text-sm italic">
            <strong>No sign-up required</strong> — your inputs stay securely in your browser.
          </p>
        </div>

        <p className="text-gray-400 text-sm">
          Created by <strong>Amjathkhan</strong>, a Fire and Life Safety professional with <strong>12+ years of field experience</strong> 
          across construction, oil & gas, power, and manufacturing.
        </p>
        
        <div className="flex justify-center space-x-4 text-xs mt-4">
          <a href="#" className="hover:text-hse-green transition">Privacy Policy</a>
          <a href="#" className="hover:text-hse-green transition">Terms of Service</a>
          <a href="#" className="hover:text-hse-green transition">Affiliate Disclosure</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
