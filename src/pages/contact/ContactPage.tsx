import astroContactMe from "@/assets/astro_contact_me.png";
import { contactConfig, isEmailJsConfigured } from "@/shared/config/contact";
import emailjs from "@emailjs/browser";
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
  profession: string;
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
  profession: "",
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
    id: "profession",
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
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<ContactStatus | null>(null);
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

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    if (!canSubmit) {
      setStatus({
        message: t("contact_me.content_error_1"),
        title: t("contact_me.title_error"),
        tone: "error",
      });
      return;
    }

    if (!isEmailJsConfigured) {
      setStatus({
        message: t("contact_me.content_email_config_missing"),
        title: t("contact_me.title_error"),
        tone: "error",
      });
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        contactConfig.emailJsServiceId,
        contactConfig.emailJsTemplateId,
        {
          first_name: form.firstname.trim(),
          from_email: form.email.trim(),
          last_name: form.name.trim(),
          message: form.message.trim(),
          profession: form.profession.trim(),
          to_email: contactConfig.recipientEmail,
        },
        { publicKey: contactConfig.emailJsPublicKey },
      );

      setStatus({
        message: t("contact_me.content_validate"),
        title: t("contact_me.title_validate"),
        tone: "success",
      });
      setForm(initialFormState);
    } catch {
      setStatus({
        message: t("contact_me.content_error_2"),
        title: t("contact_me.title_error"),
        tone: "error",
      });
    } finally {
      setIsSending(false);
    }
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
        <form
          className={styles.form}
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
        >
          <div className={styles.fieldsGrid}>
            {contactFields.map((field) => (
              <label className={styles.field} htmlFor={field.id} key={field.id}>
                <span>{t(field.labelKey)}</span>
                <input
                  autoComplete={field.id === "email" ? "email" : "on"}
                  id={field.id}
                  name={field.id}
                  disabled={isSending}
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
              disabled={isSending}
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

          <button
            className={styles.submitButton}
            disabled={isSending}
            type="submit"
          >
            {isSending ? t("contact_me.loading_send") : t("contact_me.send")}
          </button>
        </form>

        <div className={styles.visual} aria-hidden="true">
          <img className={styles.astronaut} src={astroContactMe} alt="" />
        </div>
      </section>
    </Root>
  );
}
