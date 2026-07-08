import astroContactMe from "@/assets/astro_contact_me.png";
import { contactConfig } from "@/shared/config/contact";
import {
  type ChangeEvent,
  type SyntheticEvent,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import styles from "./ContactPage.module.css";

interface ContactFormState {
  name: string;
  firstname: string;
  post: string;
  email: string;
  message: string;
}

type ContactFormField = keyof ContactFormState;

interface ContactStatus {
  tone: "error" | "success";
  title: string;
  message: string;
}

const initialFormState: ContactFormState = {
  email: "",
  firstname: "",
  message: "",
  name: "",
  post: "",
};

const contactFields = [
  {
    id: "name",
    labelKey: "contact_me.title_name",
    placeholderKey: "contact_me.label_name",
    type: "text",
  },
  {
    id: "firstname",
    labelKey: "contact_me.title_firstname",
    placeholderKey: "contact_me.label_firstname",
    type: "text",
  },
  {
    id: "post",
    labelKey: "contact_me.title_post",
    placeholderKey: "contact_me.label_post",
    type: "text",
  },
  {
    id: "email",
    labelKey: "contact_me.title_email",
    placeholderKey: "contact_me.label_email",
    type: "email",
  },
] as const satisfies readonly {
  id: ContactFormField;
  labelKey: string;
  placeholderKey: string;
  type: "email" | "text";
}[];

const hasEmptyRequiredField = (form: ContactFormState) =>
  (Object.keys(form) as ContactFormField[]).some(
    (field) => form[field].trim().length === 0,
  );

const buildMailtoHref = (form: ContactFormState, recipientEmail: string) => {
  const subject = encodeURIComponent(
    `Portfolio - ${form.name} ${form.firstname}`,
  );
  const body = encodeURIComponent(
    [
      `Bonjour/Bonsoir, je suis ${form.name} ${form.firstname}, actuellement ${form.post}.`,
      "",
      form.message,
      "",
      `Tu peux me contacter via ${form.email}`,
    ].join("\n"),
  );

  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
};

interface ContactPageProps {
  asSection?: boolean;
  sectionId?: string;
}

export function ContactPage({
  asSection = false,
  sectionId,
}: ContactPageProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [status, setStatus] = useState<ContactStatus | null>(null);
  const recipientEmail = contactConfig.recipientEmail;
  const canSubmit = useMemo(() => !hasEmptyRequiredField(form), [form]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as ContactFormField;

    setForm((currentForm) => ({
      ...currentForm,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus({
        message: t("contact_me.content_error_1"),
        title: t("contact_me.title_error"),
        tone: "error",
      });
      return;
    }

    if (!recipientEmail) {
      setStatus({
        message: t("contact_me.content_email_config_missing"),
        title: t("contact_me.title_error"),
        tone: "error",
      });
      return;
    }

    window.location.href = buildMailtoHref(form, recipientEmail);
    setStatus({
      message: t("contact_me.content_mailto"),
      title: t("contact_me.title_ready"),
      tone: "success",
    });
    setForm(initialFormState);
  };
  const Root = asSection ? "section" : "main";

  return (
    <Root
      className={styles.page}
      data-portfolio-section={asSection || undefined}
      id={sectionId}
    >
      <section className={styles.header} aria-labelledby="contact-title">
        <p className={styles.eyebrow}>{t("contact_me.subtitle")}</p>
        <h1 id="contact-title">{t("contact_me.title")}</h1>
      </section>

      <section className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldsGrid}>
            {contactFields.map((field) => (
              <label className={styles.field} htmlFor={field.id} key={field.id}>
                <span>{t(field.labelKey)}</span>
                <input
                  autoComplete={field.id === "email" ? "email" : "on"}
                  id={field.id}
                  name={field.id}
                  onChange={handleChange}
                  placeholder={t(field.placeholderKey)}
                  type={field.type}
                  value={form[field.id]}
                />
              </label>
            ))}
          </div>

          <label className={styles.field} htmlFor="message">
            <span>{t("contact_me.title_message")}</span>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              placeholder={t("contact_me.label_message")}
              rows={7}
              value={form.message}
            />
          </label>

          {status ? (
            <div
              className={styles.status}
              data-tone={status.tone}
              role="status"
            >
              <strong>{status.title}</strong>
              <span>{status.message}</span>
            </div>
          ) : null}

          <button className={styles.submitButton} type="submit">
            {t("contact_me.send")}
          </button>
        </form>

        <div className={styles.visual} aria-hidden="true">
          <img className={styles.astronaut} src={astroContactMe} alt="" />
        </div>
      </section>
    </Root>
  );
}
