import astroAboutMe from "@/assets/astro_about_me.png";
import astroContactMe from "@/assets/astro_contact_me.png";
import astroNotFound from "@/assets/astro_not_found.png";
import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const imagePreloadTimeoutMs = 12000;

const publicImageSources = [
  "/icons/about_me.svg",
  "/icons/contact_me.svg",
  "/icons/experiences.svg",
  "/icons/header_bitmoji.png",
  "/icons/home.svg",
  "/icons/not_found.svg",
  "/icons/projects.svg",
  "/icons/skills.svg",
] as const;

const appImageSources = Array.from(
  new Set([
    astroAboutMe,
    astroContactMe,
    astroNotFound,
    ...experiences.map((experience) => experience.icon),
    ...projects.map((project) => project.image),
    ...skills.map((skill) => skill.image),
    ...publicImageSources,
  ]),
);

function preloadImage(source: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let timeoutId: number | undefined;

    const finish = () => {
      window.clearTimeout(timeoutId);
      resolve();
    };

    image.decoding = "async";
    image.loading = "eager";
    image.onload = () => {
      if (typeof image.decode === "function") {
        void image.decode().then(finish, finish);
        return;
      }

      finish();
    };
    image.onerror = finish;
    timeoutId = window.setTimeout(finish, imagePreloadTimeoutMs);
    image.src = source;
  });
}

export function preloadAppImages() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return Promise.allSettled(appImageSources.map(preloadImage)).then(
    () => undefined,
  );
}
