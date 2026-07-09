import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { Color, type Group } from "three";
import { preloadFont } from "troika-three-text";

import {
  defaultLanguage,
  isSupportedLanguage,
  supportedLanguages,
} from "@/i18n";
import { contactConfig } from "@/shared/config/contact";

import { HexSphere } from "./HexSphere";
import { HomeSceneFallback } from "./HomeSceneFallback";
import { InteractiveHexagon } from "./InteractiveHexagon";
import { StarField } from "./StarField";
import styles from "./HomeScene.module.css";

const githubUrl = "https://github.com/JurojinKun";
const linkedInUrl = "https://www.linkedin.com/in/clément-communay";
const cvUrl = "/cv/CV_Clement_Communay.pdf";
const satelliteLabelFont = "/fonts/SpaceGrotesk-Bold.ttf";
const satelliteLabelCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÂÄÇÉÈÊËÎÏÔÖÙÛÜàâäçéèêëîïôöùûü -_";
const headerSatellitePitchSpeed = 0.0025;
const headerSatelliteYawSpeed = 0.0035;
const headerSatelliteRollSpeed = 0.0045;
const headerSatelliteZPosition = 8.5;

function supportsWebGL() {
  if (
    typeof document === "undefined" ||
    typeof window === "undefined" ||
    typeof window.WebGLRenderingContext === "undefined"
  ) {
    return false;
  }

  const canvas = document.createElement("canvas");

  return Boolean(
    canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"),
  );
}

function prefersReducedMotion() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined"
  ) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePreloadSatelliteLabelFont() {
  useEffect(() => {
    preloadFont(
      {
        characters: satelliteLabelCharacters,
        font: satelliteLabelFont,
      },
      () => undefined,
    );
  }, []);
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <pointLight decay={0} intensity={1} position={[10, 10, 10]} />
      </PerspectiveCamera>
      <ambientLight intensity={1} />
      <HeaderSatelliteContent />
      <HexSphere />
    </>
  );
}

function StarsCamera() {
  useFrame(({ camera }) => {
    if (typeof window !== "undefined" && window.innerHeight <= 500) {
      camera.position.set(0, 0, 0);
    } else {
      camera.position.set(0, 0, 1);
    }

    camera.updateProjectionMatrix();
  });

  return null;
}

function HeaderSatelliteContent() {
  const hexagonRef = useRef<Group>(null);
  const { size } = useThree();
  const color = useMemo(
    () => new Color("#47cdd6").lerp(new Color("#9d4dc4"), 0.46),
    [],
  );
  const markLayout = useMemo(() => {
    const isSmallHeader = size.width <= 420 || size.height <= 520;
    const isCompactHeader = size.width <= 550 || size.height <= 600;
    const slotSize = isSmallHeader ? 31 : isCompactHeader ? 36 : 42;
    const visualSize = isSmallHeader ? 24 : isCompactHeader ? 28 : 32;
    const headerPadding = 12;
    const headerHexagonOffsetX = isSmallHeader ? 2 : 3;
    const distanceFromCamera = 10 - headerSatelliteZPosition;
    const halfHeight = Math.tan((50 * Math.PI) / 360) * distanceFromCamera;
    const halfWidth = halfHeight * (size.width / size.height);
    const centerX = headerPadding + slotSize / 2 + headerHexagonOffsetX;
    const centerY = headerPadding + slotSize / 2;
    const worldPerPixel = (halfHeight * 2) / size.height;
    const visualWorldSize = visualSize * worldPerPixel;

    return {
      position: [
        (centerX / size.width) * halfWidth * 2 - halfWidth,
        halfHeight - (centerY / size.height) * halfHeight * 2,
        headerSatelliteZPosition,
      ] as const,
      scale: visualWorldSize / 0.3,
    };
  }, [size.height, size.width]);

  useFrame(() => {
    if (hexagonRef.current) {
      hexagonRef.current.rotation.x += headerSatellitePitchSpeed;
      hexagonRef.current.rotation.y += headerSatelliteYawSpeed;
      hexagonRef.current.rotation.z += headerSatelliteRollSpeed;
    }
  });

  return (
    <group position={markLayout.position} scale={markLayout.scale}>
      <InteractiveHexagon
        bodyStyle="gradient"
        hexagonColor={color}
        hexagonRef={hexagonRef}
        iconPath="/icons/header_bitmoji.png"
        iconRendering="bitmap"
        iconScale={1.08}
      />
    </group>
  );
}

function HomeHeader() {
  const { i18n, t } = useTranslation();
  const currentLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage && isSupportedLanguage(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : defaultLanguage;

  return (
    <header className={styles.header}>
      <div className={styles.brand} aria-label="Clément Communay Portfolio">
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandCopy}>
          <span className={styles.brandTitle}>Clément Communay</span>
          <span className={styles.brandMeta}>
            <span>{t("home_header.role")}</span>
            <span className={styles.brandMetaDivider} aria-hidden="true" />
            <span>{t("home_header.scope")}</span>
          </span>
        </span>
      </div>
      <div aria-label="Language" className={styles.languageActions}>
        {supportedLanguages.map((language) => (
          <button
            className={styles.languageButton}
            data-active={language === currentLanguage}
            data-language={language.toUpperCase()}
            key={language}
            onClick={() => {
              void i18n.changeLanguage(language);
            }}
            type="button"
          >
            {t(`languages.${language === "fr" ? "french" : "english"}`)}
          </button>
        ))}
      </div>
    </header>
  );
}

function HomeFooter() {
  const { t } = useTranslation();
  const emailHref = contactConfig.recipientEmail
    ? `mailto:${contactConfig.recipientEmail}`
    : "/portfolio/contactme";

  return (
    <nav aria-label="Social links" className={styles.footer}>
      <FooterLink href={githubUrl} label="GitHub">
        <GithubIcon />
      </FooterLink>
      <FooterLink href={linkedInUrl} label="LinkedIn">
        <LinkedinIcon />
      </FooterLink>
      <FooterLink download href={cvUrl} label="CV">
        <DocumentIcon />
      </FooterLink>
      <FooterLink href={emailHref} label={t("contact_me.title")}>
        <MailIcon />
      </FooterLink>
    </nav>
  );
}

function FooterLink({
  children,
  download = false,
  href,
  label,
}: {
  children: ReactNode;
  download?: boolean;
  href: string;
  label: string;
}) {
  const isExternal = href.startsWith("http");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <span
      className={styles.footerItem}
      data-tooltip-visible={isTooltipVisible}
      onPointerEnter={() => {
        setIsTooltipVisible(true);
      }}
      onPointerLeave={() => {
        setIsTooltipVisible(false);
      }}
    >
      <a
        aria-label={label}
        className={styles.footerButton}
        download={download || undefined}
        href={href}
        onBlur={() => {
          setIsTooltipVisible(false);
        }}
        onClick={(event) => {
          setIsTooltipVisible(false);
          event.currentTarget.blur();
        }}
        onFocus={() => {
          setIsTooltipVisible(true);
        }}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        {children}
      </a>
      <span className={styles.footerTooltip}>{label}</span>
    </span>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.13 2.13 0 0 1 .63-1.34c-2.22-.25-4.55-1.11-4.55-4.94a3.87 3.87 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02A9.48 9.48 0 0 1 12 5.98c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.37.84.4 1.8.1 2.64a3.86 3.86 0 0 1 1.03 2.68c0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.94 8.88H3.73v10.38h3.21V8.88ZM5.34 4a1.86 1.86 0 1 0 0 3.72 1.86 1.86 0 0 0 0-3.72Zm13.92 9.31c0-3.13-1.67-4.59-3.9-4.59a3.36 3.36 0 0 0-3.04 1.67h-.04V8.88H9.21v10.38h3.2v-5.13c0-1.35.26-2.66 1.93-2.66 1.65 0 1.67 1.54 1.67 2.75v5.04h3.2l.05-5.95Z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 3.5h7.1L18 8.4v12.1H6V3.5Zm8 1.9V8h2.6L14 5.4ZM8 10.5v1.6h8v-1.6H8Zm0 3.4v1.6h8v-1.6H8Zm0 3.4v1.6h5.2v-1.6H8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3.5 6.25h17v11.5h-17V6.25Zm2.43 1.5L12 12.37l6.07-4.62H5.93Zm13.07 8.5V9.04l-7 5.33-7-5.33v7.21h14Z" />
    </svg>
  );
}

export function HomeScene() {
  const canRenderScene = supportsWebGL() && !prefersReducedMotion();

  usePreloadSatelliteLabelFont();

  if (!canRenderScene) {
    return <HomeSceneFallback />;
  }

  return (
    <div className={styles.sceneRoot}>
      <HomeHeader />
      <Canvas className={styles.starsCanvas} camera={{ position: [0, 0, 1] }}>
        <StarField color="#ffffff" count={1500} radius={1.2} size={0.0042} />
        <StarsCamera />
      </Canvas>
      <Canvas
        className={styles.mainCanvas}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <HomeFooter />
    </div>
  );
}
