import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import Home from './pages/Home';
import Research from './pages/Research';
import DataDashboard from './pages/DataDashboard';
import CLDAnalysis from './pages/CLDAnalysis';
import EPSAnalysis from './pages/EPSAnalysis';
import RuralHealthcareModel from './pages/StockFlow';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/dashboard" element={<DataDashboard />} />
            <Route path="/cld-analysis" element={<CLDAnalysis />} />
            <Route path="/eps-analysis" element={<EPSAnalysis />} />
            <Route path="/stock-flow" element={<RuralHealthcareModel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
