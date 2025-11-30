import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import Generators from './pages/Generators';
import Checklists from './pages/Checklists';
import { ToolProvider } from './context/ToolContext';
import './styles/globals.css';

function App() {
  return (
    <ToolProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/generators" element={<Generators />} />
              <Route path="/checklists" element={<Checklists />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToolProvider>
  );
}

export default App;