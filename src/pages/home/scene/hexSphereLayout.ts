import type { ScenePosition } from "./sceneUtils";

export const hexSphereCameraFov = 50;
export const hexSphereCameraZPosition = 10;
export const hexSphereRadius = 2;
export const desktopSatelliteZOffset = 1.3;

const satelliteSphereClearance = 0.36;
const viewportOrbitClearance = 0.04;

export interface SceneViewportSize {
  height: number;
  width: number;
}

function getSafeViewportDimension(value: number) {
  return Number.isFinite(value) ? Math.max(1, value) : 1;
}

export function getSafeSceneViewportSize({
  height,
  width,
}: SceneViewportSize): SceneViewportSize {
  return {
    height: getSafeViewportDimension(height),
    width: getSafeViewportDimension(width),
  };
}

function isPortraitTabletViewport({ height, width }: SceneViewportSize) {
  return width > 720 && width <= 1180 && height > width;
}

function getHexSphereBasePosition({
  height,
  width,
}: SceneViewportSize): ScenePosition {
  if (isPortraitTabletViewport({ height, width })) {
    return [0, 0.1, -0.55];
  }

  if (height <= 430) {
    return [0, 0.1, -4.5];
  }

  if (width <= 400) {
    return [0, 0.1, -5.2];
  }

  if (width <= 600) {
    return [0, 0.1, -3.4];
  }

  if (width <= 1000) {
    return [0, 0.1, 0.5];
  }

  return [0, 0.1, 2.5];
}

function getHexSphereOrbitRadius({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return 2.12;
  }

  if (shortestSide <= 430) {
    return 2.22;
  }

  if (width <= 480) {
    return 2.35;
  }

  if (width <= 720) {
    return 2.45;
  }

  return 2.6;
}

export function getVisibleHalfExtents({
  objectZ,
  viewportSize,
}: {
  objectZ: number;
  viewportSize: SceneViewportSize;
}) {
  const safeViewportSize = getSafeSceneViewportSize(viewportSize);
  const distanceFromCamera = Math.max(hexSphereCameraZPosition - objectZ, 0.1);
  const halfHeight =
    Math.tan((hexSphereCameraFov * Math.PI) / 360) * distanceFromCamera;
  const halfWidth =
    halfHeight * (safeViewportSize.width / safeViewportSize.height);

  return { halfHeight, halfWidth };
}

function getHexSphereSatelliteScale({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.92;
  }

  if (shortestSide <= 380) {
    return 0.82;
  }

  if (width <= 480) {
    return 0.88;
  }

  if (width <= 720) {
    return 0.94;
  }

  return 1;
}

function getHexSphereScale({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.88;
  }

  if (shortestSide <= 380) {
    return 0.9;
  }

  if (width <= 480) {
    return 0.94;
  }

  if (width <= 720 || height <= 640) {
    return 0.98;
  }

  return 1;
}

function getHexSphereLabelFontSize({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return 0.096;
  }

  if (width <= 480) {
    return 0.104;
  }

  if (width <= 720 || height <= 640) {
    return 0.106;
  }

  return 0.1;
}

function getHexSphereLabelOffsetY({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return -0.28;
  }

  if (width <= 480) {
    return -0.29;
  }

  if (width <= 720 || height <= 640) {
    return -0.3;
  }

  return -0.27;
}

function getHexSphereLabelMaxWidth({ height, width }: SceneViewportSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.88;
  }

  if (shortestSide <= 360) {
    return 0.76;
  }

  if (width <= 480) {
    return 0.84;
  }

  if (width <= 720 || height <= 640) {
    return 0.92;
  }

  return 0.95;
}

function getSafeOrbitRadius({
  availableRadius,
  baseRadius,
  minimumRadius,
}: {
  availableRadius: number;
  baseRadius: number;
  minimumRadius: number;
}) {
  const safeAvailableRadius = Math.max(0.1, availableRadius);
  const safeMinimumRadius = Math.min(minimumRadius, safeAvailableRadius);

  return Math.min(baseRadius, Math.max(safeMinimumRadius, safeAvailableRadius));
}

function getMinimumOrbitRadius({
  sphereScale,
  tileScale,
}: {
  sphereScale: number;
  tileScale: number;
}) {
  return hexSphereRadius * sphereScale + satelliteSphereClearance * tileScale;
}

function getLabelVerticalClearance({
  labelFontSize,
  labelOffsetY,
  tileScale,
}: {
  labelFontSize: number;
  labelOffsetY: number;
  tileScale: number;
}) {
  return (Math.abs(labelOffsetY) + labelFontSize * 1.4 + 0.1) * tileScale;
}

function getLabelHorizontalClearance({
  labelMaxWidth,
  tileScale,
}: {
  labelMaxWidth: number;
  tileScale: number;
}) {
  return (labelMaxWidth / 2 + 0.18) * tileScale;
}

function getDepthAdjustedGroupPosition({
  basePosition,
  labelFontSize,
  labelMaxWidth,
  labelOffsetY,
  sphereScale,
  tileScale,
  viewportSize,
}: {
  basePosition: ScenePosition;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  sphereScale: number;
  tileScale: number;
  viewportSize: SceneViewportSize;
}): ScenePosition {
  const safeViewportSize = getSafeSceneViewportSize(viewportSize);
  const aspectRatio = safeViewportSize.width / safeViewportSize.height;
  const halfFovTangent = Math.tan((hexSphereCameraFov * Math.PI) / 360);
  const minimumOrbitRadius = getMinimumOrbitRadius({
    sphereScale,
    tileScale,
  });
  const preferredHorizontalOrbitRadius = Math.max(
    getHexSphereOrbitRadius(safeViewportSize),
    minimumOrbitRadius,
  );
  const requiredHalfWidth =
    preferredHorizontalOrbitRadius +
    getLabelHorizontalClearance({ labelMaxWidth, tileScale }) +
    viewportOrbitClearance;
  const requiredHalfHeight =
    minimumOrbitRadius +
    getLabelVerticalClearance({
      labelFontSize,
      labelOffsetY,
      tileScale,
    }) +
    viewportOrbitClearance;
  const requiredDistance = Math.max(
    requiredHalfWidth / (halfFovTangent * aspectRatio),
    requiredHalfHeight / halfFovTangent,
  );
  const maxGroupZ =
    hexSphereCameraZPosition - requiredDistance - desktopSatelliteZOffset;

  if (basePosition[2] <= maxGroupZ) {
    return basePosition;
  }

  return [basePosition[0], basePosition[1], maxGroupZ] satisfies ScenePosition;
}

export function getHexSphereOrbitRadii({
  groupPosition,
  labelFontSize,
  labelMaxWidth,
  labelOffsetY,
  sphereScale,
  tileScale,
  viewportSize,
}: {
  groupPosition: ScenePosition;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  sphereScale: number;
  tileScale: number;
  viewportSize: SceneViewportSize;
}) {
  const safeViewportSize = getSafeSceneViewportSize(viewportSize);
  const baseRadius = getHexSphereOrbitRadius(safeViewportSize);
  const { halfHeight, halfWidth } = getVisibleHalfExtents({
    objectZ: groupPosition[2] + desktopSatelliteZOffset,
    viewportSize: safeViewportSize,
  });
  const labelVerticalClearance = getLabelVerticalClearance({
    labelFontSize,
    labelOffsetY,
    tileScale,
  });
  const labelHorizontalClearance = getLabelHorizontalClearance({
    labelMaxWidth,
    tileScale,
  });
  const minimumRadius = getMinimumOrbitRadius({
    sphereScale,
    tileScale,
  });
  const availableRadiusX = halfWidth - labelHorizontalClearance;
  const availableRadiusY = halfHeight - labelVerticalClearance;

  return {
    x: getSafeOrbitRadius({
      availableRadius: availableRadiusX,
      baseRadius,
      minimumRadius,
    }),
    y: getSafeOrbitRadius({
      availableRadius: availableRadiusY,
      baseRadius,
      minimumRadius,
    }),
  };
}

export function getHexSphereLayout(viewportSize: SceneViewportSize) {
  const safeViewportSize = getSafeSceneViewportSize(viewportSize);
  const baseGroupPosition = getHexSphereBasePosition(safeViewportSize);
  const sphereScale = getHexSphereScale(safeViewportSize);
  const satelliteScale = getHexSphereSatelliteScale(safeViewportSize);
  const labelFontSize = getHexSphereLabelFontSize(safeViewportSize);
  const labelMaxWidth = getHexSphereLabelMaxWidth(safeViewportSize);
  const labelOffsetY = getHexSphereLabelOffsetY(safeViewportSize);
  const groupPosition = getDepthAdjustedGroupPosition({
    basePosition: baseGroupPosition,
    labelFontSize,
    labelMaxWidth,
    labelOffsetY,
    sphereScale,
    tileScale: satelliteScale,
    viewportSize: safeViewportSize,
  });

  return {
    groupPosition,
    labelFontSize,
    labelMaxWidth,
    labelOffsetY,
    satelliteScale,
    sphereScale,
    viewportSize: safeViewportSize,
  };
}
