import "./translations/i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home3D from "./pages/Home3D";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home3D />} />
        <Route path="/portfolio/:sectionId?" element={<Portfolio />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
