import { Color } from "three";

export const sceneColorPulseSpeed = 0.1;
export const sceneColorPulsePhase = 0;
export const sceneEndColorHex = "#9d4dc4";
export const sceneStartColorHex = "#47cdd6";

const sceneColorStartTime = getCurrentTimeInSeconds();

function getCurrentTimeInSeconds() {
  if (typeof performance !== "undefined") {
    return performance.now() / 1000;
  }

  return Date.now() / 1000;
}

export function getSceneColorElapsedTime() {
  return getCurrentTimeInSeconds() - sceneColorStartTime;
}

export function getScenePulseColor({
  elapsedTime,
  endColor,
  startColor,
  targetColor,
}: {
  elapsedTime: number;
  endColor: Color;
  startColor: Color;
  targetColor: Color;
}) {
  return targetColor
    .copy(startColor)
    .lerp(
      endColor,
      Math.abs(
        Math.sin(elapsedTime * sceneColorPulseSpeed + sceneColorPulsePhase),
      ),
    );
}
