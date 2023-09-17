import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import "./translations/i18n";
import './config'
import Home3D from "./pages/Home3D";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const App = () => {

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const portfolio = document.getElementById('root');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
      setTimeout(() => {
        sessionStorage.setItem('isSessionActive', 'true');
        loadingScreen.style.display = 'none';
        portfolio.style.display = 'flex';
      }, 1000);
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home3D />} />
        <Route path="/portfolio/:sectionId?" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
