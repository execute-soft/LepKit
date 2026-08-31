import {
  Field,
  Form,
  Formik,
  useField,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import { useState } from "react";
import { Spinner } from "react-activity";
import * as yup from "yup";
import { AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";

import LanguageSwitcher from "@/features/i18n/components/LanguageSwitcher";
import { Button, Checkbox, Input } from "@repo/uix/react/primitives";
import { useLanguage } from "@/lib/hooks";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => Promise<void> | void;
  errorMessage?: string | null;
};

const supportEmail = "support@execute.dev";

function EmailInputField({ label }: Readonly<{ label: string }>) {
  const [field, meta] = useField<string>("email");
  const showError = Boolean(meta.error) && (meta.touched || meta.value !== meta.initialValue);

  return (
    <div className="w-full space-y-1.5">
      <Input
        {...field}
        type="email"
        label={label}
        autoFocus
        autoComplete="email"
        aria-invalid={showError ? true : undefined}
      />
      {showError ? <p className="text-xs font-medium text-destructive">{meta.error}</p> : null}
    </div>
  );
}

function PasswordInputField({ label }: Readonly<{ label: string }>) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField<string>("password");
  const showError = Boolean(meta.error) && (meta.touched || meta.value !== meta.initialValue);

  return (
    <div className="w-full space-y-1.5">
      <div className="relative">
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          label={label}
          className="pr-10"
          autoComplete="current-password"
          aria-invalid={showError ? true : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {showError ? <p className="text-xs font-medium text-destructive">{meta.error}</p> : null}
    </div>
  );
}

export function LoginForm({ onSubmit, errorMessage }: Readonly<LoginFormProps>) {
  const { t } = useLanguage();

  const loginSchema = yup.object({
    email: yup.string().email(t("auth.validation.invalidEmail")).required(t("auth.validation.invalidEmail")),
    password: yup.string().min(8, t("auth.validation.passwordLength")).required(t("auth.validation.passwordLength")),
    rememberMe: yup.boolean().notRequired(),
  });

  return (
    <section className="w-full max-w-md">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-foreground">
            B
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">StockEye</p>
            <p className="text-xs text-muted-foreground">{t("auth.login.portalLabel")}</p>
          </div>
        </div>
        <LanguageSwitcher compact />
      </div>

      <div className="rounded-[1.25rem] border border-border bg-card px-6 py-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-8">
        <div className="space-y-2">
          <h1 className="text-[1.7rem] font-semibold leading-tight tracking-normal text-foreground">
            {t("auth.login.signIn")}
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {t("auth.login.subtitle")}
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={loginSchema}
          validateOnChange
          validateOnBlur
          onSubmit={(values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
            if (onSubmit) {
              Promise.resolve(onSubmit(values)).finally(() => {
                actions.setSubmitting(false);
              });
            } else {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-7 space-y-4">
              <EmailInputField label={t("auth.login.emailPlaceholder")} />
              <PasswordInputField label={t("auth.login.passwordPlaceholder")} />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Field name="rememberMe">
                  {({ field, form }: FieldProps) => (
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox
                        name={field.name}
                        checked={Boolean(field.value)}
                        onCheckedChange={(checked) =>
                          form.setFieldValue(field.name, checked === true)
                        }
                        onBlur={field.onBlur}
                      />
                      <span>{t("auth.login.rememberMe")}</span>
                    </label>
                  )}
                </Field>
                <a
                  href={`mailto:${supportEmail}?subject=StockEye password help`}
                  className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {t("auth.login.forgotPassword")}
                </a>
              </div>

              {errorMessage ? (
                <div className="flex gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="font-medium">{t("auth.login.signInFailed")}</p>
                    <p className="mt-0.5 text-xs leading-5 text-destructive/85">{errorMessage}</p>
                  </div>
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full justify-between"
              >
                <span>{t("auth.login.signIn")}</span>
                {isSubmitting ? (
                  <Spinner size={10} color="currentColor" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted-foreground">
        <span>{t("auth.login.needHelp")}</span>
        <a
          href={`mailto:${supportEmail}?subject=StockEye account access`}
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          {supportEmail}
        </a>
        <a
          href="#"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          {t("auth.login.termsOfService")}
        </a>
      </div>
    </section>
  );
}
