import { useEffect } from "react";

import "../css/Home3D.css";
import MainSceneCanvas from "../canvas/MainSceneCanvas";
import StarsCanvas from "../canvas/StarsCanvas";
import FixedHeader from "../components/FixedHeader";
import FixedFooter from "../components/FixedFooter";

const Home3D = () => {
  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    return () => {
      style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="parent">
      <FixedHeader />
      <StarsCanvas />
      <MainSceneCanvas />
      <FixedFooter />
    </div>
  );
};

export default Home3D;
