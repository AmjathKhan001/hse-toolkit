import React from 'react';
// The BrowserRouter component is correctly aliased as Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header.jsx';
import Footer from './components/layout/footer.jsx';
import Home from './pages/home.jsx';
import Calculators from './pages/calculators.jsx';
import Generators from './pages/generators.jsx';
import Checklists from './pages/checklists.jsx';
import { ToolProvider } from './context/toolcontext.jsx';
import './styles/globals.css';

function App() {
  return (
    <ToolProvider>
      {/* 🛠️ FIX 1: Added basename="/" for correct deployment routing on Netlify */}
      <Router basename="/"> 
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* 🛠️ FIX 2: Corrected component casing from <home /> to <Home />, etc. */}
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
