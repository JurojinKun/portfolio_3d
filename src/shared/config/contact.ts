export const contactConfig = {
  recipientEmail: import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "",
} as const;
