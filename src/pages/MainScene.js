import { Scroll, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SphereCustom from "../components/Sphere";
import Overview from "../components/Overview";
import { setHomeOffset } from "../redux/slices/homeSlice";
import { homeSelector } from "../redux/selectors/homeSelector";

const MainScene = () => {
  const scroll = useScroll();
  const cameraRef = useRef();

  const dispatch = useDispatch();
  const offset = useSelector(homeSelector);

  const [opacityOverview, setOpacityOverview] = useState(1);

  useEffect(() => {
    if (offset === 1) {
      scroll.scroll.current = 1;
    }
  }, [offset, scroll]);

  useFrame(() => {
    dispatch(setHomeOffset(scroll.offset));
    setOpacityOverview(1 - scroll.range(0, 1 / 2));
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 10]}>
        <pointLight position={[10, 10, 10]} />
      </PerspectiveCamera>
      <ambientLight />
      <SphereCustom scroll={scroll} />
      <Scroll html>
        <Overview opacity={opacityOverview} />
      </Scroll>
    </>
  );
};

export default MainScene;
