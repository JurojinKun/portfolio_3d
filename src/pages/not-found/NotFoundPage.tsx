import astroNotFound from "@/assets/astro_not_found.png";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const blackHoleRings = [0, 1, 2, 3] as const;
const MIN_STAR_COUNT = 28;
const MAX_STAR_COUNT = 220;
const STAR_AREA_RATIO = 6200;
const MIN_SHOOTING_STAR_COUNT = 1;
const MAX_SHOOTING_STAR_COUNT = 6;
const SHOOTING_STAR_AREA_RATIO = 280000;

interface CursorPosition {
  x: number;
  y: number;
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clampRounded(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function getResponsiveStarfieldCounts(width: number, height: number) {
  const viewportArea = width * height;

  return {
    shootingStarCount: clampRounded(
      viewportArea / SHOOTING_STAR_AREA_RATIO,
      MIN_SHOOTING_STAR_COUNT,
      MAX_SHOOTING_STAR_COUNT,
    ),
    starCount: clampRounded(
      viewportArea / STAR_AREA_RATIO,
      MIN_STAR_COUNT,
      MAX_STAR_COUNT,
    ),
  };
}

function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (/jsdom/i.test(window.navigator.userAgent)) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    let animationFrameId: number | undefined;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = Math.max(1, Math.round(width));
      const canvasHeight = Math.max(1, Math.round(height));
      const random = createSeededRandom(canvasWidth * 31 + canvasHeight * 17);
      const { shootingStarCount, starCount } = getResponsiveStarfieldCounts(
        canvasWidth,
        canvasHeight,
      );

      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let index = 0; index < starCount; index += 1) {
        const x = random() * canvasWidth;
        const y = random() * canvasHeight;
        const radius = 0.35 + random() * 1.35;
        const opacity = 0.28 + random() * 0.68;

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${opacity.toString()})`;
        context.shadowColor = `rgba(209, 243, 245, ${(opacity * 0.65).toString()})`;
        context.shadowBlur = radius * (1.4 + random() * 2.2);
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      context.lineCap = "round";

      for (let index = 0; index < shootingStarCount; index += 1) {
        const x = random() * canvasWidth;
        const y = canvasHeight * (0.28 + random() * 0.62);
        const length = 46 + random() * 62;
        const endX = x + length;
        const endY = y - length * (0.72 + random() * 0.18);
        const gradient = context.createLinearGradient(x, y, endX, endY);

        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.74, "rgba(173, 226, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.82)");

        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = 0.65 + random() * 0.55;
        context.moveTo(x, y);
        context.lineTo(endX, endY);
        context.stroke();
      }
    };

    const scheduleDraw = () => {
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    scheduleDraw();
    window.addEventListener("resize", scheduleDraw);

    return () => {
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("resize", scheduleDraw);
    };
  }, []);

  return (
    <canvas aria-hidden="true" className={styles.starfield} ref={canvasRef} />
  );
}

export function NotFoundPage() {
  const { t } = useTranslation();
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isCursorActive, setIsCursorActive] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };
  const cursorTransform = `translate3d(${cursorPosition.x.toString()}px, ${cursorPosition.y.toString()}px, 0)`;

  return (
    <main
      className={styles.page}
      data-cursor-active={isCursorActive}
      onPointerMove={handlePointerMove}
    >
      <StarryBackground />

      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.visual} aria-hidden="true">
          <img alt="" className={styles.astronaut} src={astroNotFound} />
          <div
            className={styles.blackHole}
            onPointerEnter={() => {
              setIsCursorActive(true);
            }}
            onPointerLeave={() => {
              setIsCursorActive(false);
            }}
          >
            {blackHoleRings.map((ring) => (
              <span key={ring} />
            ))}
          </div>
        </div>

        <div className={styles.copy}>
          <h1 id="not-found-title">{t("not_found.user_lost")}</h1>
          <p>{t("not_found.url_not_found")}</p>
          <Link className={styles.homeLink} to="/">
            {t("not_found.back_home")}
          </Link>
        </div>
      </section>

      {isCursorActive ? (
        <div
          aria-hidden="true"
          className={styles.bugCursorPosition}
          style={{
            transform: cursorTransform,
          }}
        >
          <span className={styles.bugCursor} />
        </div>
      ) : null}
    </main>
  );
}
