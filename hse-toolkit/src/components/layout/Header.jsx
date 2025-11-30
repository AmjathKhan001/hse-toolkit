import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, FileText, Checklist } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/calculators', label: 'KPIs & Rates', icon: Calculator },
    { path: '/generators', label: 'Documentation', icon: FileText },
    { path: '/checklists', label: 'Checklists', icon: Checklist }
  ];

  return (
    <header className="bg-dark-gray text-white p-4 rounded-lg shadow-lg mb-6 text-center no-print">
      <h1 className="text-3xl font-extrabold mb-1">HSE Toolkit</h1>
      <p className="text-lg font-light">Practical, audit-ready tools</p>
      <p className="text-sm text-gray-300 mt-1">No sign-up required — your data stays in your browser</p>
      
      <nav className="mt-4">
        <div className="flex flex-wrap justify-center gap-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(path)
                  ? 'bg-hse-blue text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;