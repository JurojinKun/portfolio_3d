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

// TODO : 
// - Passer de css à scss, avec architecture BEM (Block-Element-Modifier) genre dard--title__disabled
// - Plus de setState nuls dans les composants, les jaotuer dans les slices, quitte à avoir un slice par page 
// - pas de map sur des gros tableaux, CONSTANTES ! 
// Pas de fonction déclarée dans tes useEffect 
// Importe les images avec require, pas de truc chelou dans tes useEffect 
//  PAS DE JS VANILLA 
// Pas de style inline stp bro 