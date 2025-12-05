import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Added Menu and X icons for the mobile toggle
import { Home, Calculator, FileText, ListChecks, Menu, X } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    // New state for controlling the mobile menu's open/close status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    {/* Desktop Navigation - Hidden on mobile */}
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
                            <ListChecks className="w-5 h-5" />
                            <span>Checklists</span>
                        </Link>
                    </nav>
                    
                    {/* Mobile Menu Button (Hamburger) - Visible on mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-700 hover:text-blue-500 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu - Conditionally rendered */}
            {isMenuOpen && (
                <nav className="md:hidden px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}>
                        <div className="flex items-center space-x-2">
                            <Home className="w-5 h-5" />
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link to="/calculators" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/calculators')}`}>
                        <div className="flex items-center space-x-2">
                            <Calculator className="w-5 h-5" />
                            <span>Calculators</span>
                        </div>
                    </Link>
                    <Link to="/generators" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/generators')}`}>
                        <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5" />
                            <span>Generators</span>
                        </div>
                    </Link>
                    <Link to="/checklists" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/checklists')}`}>
                        <div className="flex items-center space-x-2">
                            <ListChecks className="w-5 h-5" />
                            <span>Checklists</span>
                        </div>
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
