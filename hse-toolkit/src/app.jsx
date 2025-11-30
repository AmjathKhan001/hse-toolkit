import React from 'react';
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
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<home />} />
              <Route path="/calculators" element={<calculators />} />
              <Route path="/generators" element={<generators />} />
              <Route path="/checklists" element={<checklists />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToolProvider>
  );
}

export default App;
