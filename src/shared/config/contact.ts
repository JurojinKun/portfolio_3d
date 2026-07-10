const configuredEmailJsToName = import.meta.env.EMAILJS_TO_NAME?.trim();

export const contactConfig = {
  emailJsPublicKey: import.meta.env.EMAILJS_PUBLIC_KEY?.trim() ?? "",
  emailJsServiceId: import.meta.env.EMAILJS_SERVICE_ID?.trim() ?? "",
  emailJsTemplateId: import.meta.env.EMAILJS_TEMPLATE_ID?.trim() ?? "",
  emailJsToName:
    configuredEmailJsToName && configuredEmailJsToName.length > 0
      ? configuredEmailJsToName
      : "Clément Communay",
  recipientEmail: import.meta.env.CONTACT_EMAIL?.trim() ?? "",
} as const;

export const isEmailJsConfigured = Boolean(
  contactConfig.emailJsPublicKey &&
  contactConfig.emailJsServiceId &&
  contactConfig.emailJsTemplateId &&
  contactConfig.recipientEmail,
);
