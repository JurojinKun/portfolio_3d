import "./translations/i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Home3D from "./pages/Home3D";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const App = () => {

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
      setTimeout(() => {
        loadingScreen.style.display = 'none';
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
