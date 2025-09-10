import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./translations/i18n";
import './config'
import Home3D from "./pages/Home3D";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import ErrorModal from "./components/ErrorModal";

const App = () => {

  return (
    <ErrorBoundary
      fallbackRender={ErrorModal}>
      <Router>
        <Routes>
          <Route path="/" element={<Home3D />} />
          <Route path="/portfolio/:sectionId?" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

/// TODO keep redux state sphere after end of animation
