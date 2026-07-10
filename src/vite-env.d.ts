/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CONTACT_EMAIL?: string;
  readonly EMAILJS_PUBLIC_KEY?: string;
  readonly EMAILJS_SERVICE_ID?: string;
  readonly EMAILJS_TEMPLATE_ID?: string;
  readonly EMAILJS_TO_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
