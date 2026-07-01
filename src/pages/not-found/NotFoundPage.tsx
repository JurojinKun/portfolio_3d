import astroNotFound from "@/assets/astro_not_found.png";
import { useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const blackHoleRings = [0, 1, 2, 3] as const;

interface CursorPosition {
  x: number;
  y: number;
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
          className={styles.bugCursor}
          style={{
            transform: cursorTransform,
          }}
        />
      ) : null}
    </main>
  );
}
