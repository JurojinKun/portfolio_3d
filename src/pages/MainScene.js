import { Scroll, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SphereCustom from "../components/Sphere";
import Overview from "../components/Overview";
import { resetHomeOffset, setHomeOffset } from "../redux/slices/homeSlice";
import { homeSelector } from "../redux/selectors/homeSelector";

const clampProgress = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value >= 0.995) {
    return 1;
  }
  if (value <= 0.005) {
    return 0;
  }
  return value;
};

const computeRange = (value, from, distance) => {
  if (distance <= 0) {
    return 0;
  }
  const progress = (value - from) / distance;
  if (progress <= 0) {
    return 0;
  }
  if (progress >= 1) {
    return 1;
  }
  return progress;
};

const LOCK_THRESHOLD = 0.995;
const RELEASE_THRESHOLD = 0.005;

const MainScene = () => {
  const scroll = useScroll();
  const cameraRef = useRef();

  const dispatch = useDispatch();
  const offset = useSelector(homeSelector);

  const [opacityOverview, setOpacityOverview] = useState(() =>
    offset >= LOCK_THRESHOLD ? 0 : 1
  );
  const [appliedTarget, setAppliedTarget] = useState(null);

  const persistedTarget =
    offset >= LOCK_THRESHOLD ? 1 : offset <= RELEASE_THRESHOLD ? 0 : null;

  useEffect(() => {
    if (!scroll.el) {
      return;
    }

    if (persistedTarget === null) {
      setAppliedTarget(null);
      return;
    }

    if (appliedTarget === persistedTarget) {
      return;
    }

    let frameId = null;

    const applyPersistedOffset = () => {
      if (!scroll.el) {
        return;
      }

      if (persistedTarget === 1) {
        const maxScrollTop = Math.max(
          scroll.el.scrollHeight - scroll.el.clientHeight,
          0
        );
        if (Math.abs(scroll.el.scrollTop - maxScrollTop) > 1) {
          scroll.el.scrollTop = maxScrollTop;
        }
      } else if (persistedTarget === 0) {
        if (Math.abs(scroll.el.scrollTop) > 1) {
          scroll.el.scrollTop = 0;
        }
      }

      scroll.scroll.current = persistedTarget;

      if (Math.abs(scroll.offset - persistedTarget) <= 0.002) {
        setAppliedTarget(persistedTarget);
        frameId = null;
        return;
      }

      if (typeof requestAnimationFrame === "function") {
        frameId = requestAnimationFrame(applyPersistedOffset);
      }
    };

    if (typeof requestAnimationFrame === "function") {
      frameId = requestAnimationFrame(applyPersistedOffset);
    } else {
      applyPersistedOffset();
    }

    return () => {
      if (frameId !== null && typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(frameId);
      }
    };
  }, [persistedTarget, appliedTarget, scroll]);

  useFrame(() => {
    const pendingPersistApply =
      persistedTarget !== null && appliedTarget !== persistedTarget;

    const normalizedOffset = pendingPersistApply
      ? persistedTarget
      : clampProgress(scroll.offset);

    if (!pendingPersistApply) {
      if (normalizedOffset >= LOCK_THRESHOLD && offset !== 1) {
        dispatch(setHomeOffset(1));
      } else if (normalizedOffset <= RELEASE_THRESHOLD && offset !== 0) {
        dispatch(resetHomeOffset());
      }
    }

    const overviewProgress = computeRange(normalizedOffset, 0, 0.5);
    setOpacityOverview(1 - overviewProgress);
  });

  const sphereOverride =
    persistedTarget !== null && appliedTarget !== persistedTarget
      ? persistedTarget
      : undefined;

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 10]}>
        <pointLight position={[10, 10, 10]} />
      </PerspectiveCamera>
      <ambientLight />
      <SphereCustom scroll={scroll} offsetOverride={sphereOverride} />
      <Scroll html>
        <Overview opacity={opacityOverview} />
      </Scroll>
    </>
  );
};

export default MainScene;
