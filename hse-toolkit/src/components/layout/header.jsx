import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// CHANGED: 'Checklist' is not exported. Replaced with 'ListChecks'.
import { Home, Calculator, FileText, ListChecks } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    // Helper function to determine active link
    const isActive = (path) => location.pathname === path ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500';

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-800">
                            HSE Toolkit
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className={`flex items-center space-x-1 p-2 ${isActive('/')}`}>
                            <Home className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link to="/calculators" className={`flex items-center space-x-1 p-2 ${isActive('/calculators')}`}>
                            <Calculator className="w-5 h-5" />
                            <span>Calculators</span>
                        </Link>
                        <Link to="/generators" className={`flex items-center space-x-1 p-2 ${isActive('/generators')}`}>
                            <FileText className="w-5 h-5" />
                            <span>Generators</span>
                        </Link>
                        <Link to="/checklists" className={`flex items-center space-x-1 p-2 ${isActive('/checklists')}`}>
                            {/* CHANGED: Used the corrected component name */}
                            <ListChecks className="w-5 h-5" />
                            <span>Checklists</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
