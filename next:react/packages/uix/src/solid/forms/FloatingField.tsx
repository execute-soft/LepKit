/** @jsxImportSource solid-js */
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

type FloatingFieldBaseProps = {
  error?: string;
  label: string;
  required?: boolean;
  trailing?: JSX.Element;
};

type FloatingInputFieldProps = FloatingFieldBaseProps & {
  controlClass?: string;
  inputMode?: JSX.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  name: string;
  onInput?: (value: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "children" | "onInput" | "value">;

type FloatingSelectFieldProps = FloatingFieldBaseProps & {
  children: JSX.Element;
  controlClass?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
} & Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "children" | "onChange" | "value">;

type FloatingTextareaFieldProps = FloatingFieldBaseProps & {
  controlClass?: string;
  name: string;
  onInput?: (value: string) => void;
  placeholder?: string;
  value?: string;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "children" | "onInput" | "value">;

const fieldShellClass = "relative block";
const fieldLabelClass =
  "pointer-events-none absolute left-3 top-2 z-10 text-xs font-semibold text-neutral-500 transition";
const fieldControlClass =
  "h-13 w-full rounded-md border border-neutral-300 bg-white px-3 pb-1 pt-5 text-sm font-bold text-ink outline-none transition placeholder:text-transparent focus:border-ink";
const fieldErrorControlClass = "border-red-500 focus:border-red-500";
const fieldErrorClass = "mt-1.5 text-xs font-semibold text-red-500";

export function FloatingInputField(props: FloatingInputFieldProps) {
  const [local, inputProps] = splitProps(props, [
    "error",
    "controlClass",
    "label",
    "onInput",
    "placeholder",
    "required",
    "trailing",
    "type",
    "value",
  ]);

  return (
    <label class={fieldShellClass}>
      <span class={fieldLabelClass}>
        {local.label}
        <Show when={local.required}>
          <span class="text-red-500"> *</span>
        </Show>
      </span>
      <input
        {...inputProps}
        aria-invalid={Boolean(local.error)}
        class={`${fieldControlClass} ${local.controlClass ?? ""} ${local.trailing ? "pr-12" : ""}`}
        classList={{ [fieldErrorControlClass]: Boolean(local.error) }}
        onInput={(event) => local.onInput?.(event.currentTarget.value)}
        placeholder={local.placeholder ?? local.label}
        type={local.type ?? "text"}
        value={local.value ?? ""}
      />
      <Show when={local.trailing}>
        {(trailing) => <span class="absolute right-0 top-0">{trailing()}</span>}
      </Show>
      <Show when={local.error}>
        {(error) => <p class={fieldErrorClass}>{error()}</p>}
      </Show>
    </label>
  );
}

export function FloatingSelectField(props: FloatingSelectFieldProps) {
  const [local, selectProps] = splitProps(props, [
    "children",
    "controlClass",
    "error",
    "label",
    "onChange",
    "required",
    "trailing",
    "value",
  ]);

  return (
    <label class={fieldShellClass}>
      <span class={fieldLabelClass}>
        {local.label}
        <Show when={local.required}>
          <span class="text-red-500"> *</span>
        </Show>
      </span>
      <select
        {...selectProps}
        aria-invalid={Boolean(local.error)}
        class={`${fieldControlClass} appearance-none ${local.controlClass ?? ""} ${local.trailing ? "pr-12" : "pr-10"}`}
        classList={{ [fieldErrorControlClass]: Boolean(local.error) }}
        onChange={(event) => local.onChange?.(event.currentTarget.value)}
        value={local.value}
      >
        {local.children}
      </select>
      <Show when={local.trailing}>
        {(trailing) => <span class="absolute right-0 top-0">{trailing()}</span>}
      </Show>
      <Show when={local.error}>
        {(error) => <p class={fieldErrorClass}>{error()}</p>}
      </Show>
    </label>
  );
}

export function FloatingTextareaField(props: FloatingTextareaFieldProps) {
  const [local, textareaProps] = splitProps(props, [
    "controlClass",
    "error",
    "label",
    "onInput",
    "placeholder",
    "required",
    "trailing",
    "value",
  ]);

  return (
    <label class={fieldShellClass}>
      <span class={fieldLabelClass}>
        {local.label}
        <Show when={local.required}>
          <span class="text-red-500"> *</span>
        </Show>
      </span>
      <textarea
        {...textareaProps}
        aria-invalid={Boolean(local.error)}
        class={`min-h-28 w-full resize-y rounded-md border border-neutral-300 bg-white px-3 pb-3 pt-7 text-sm font-semibold text-ink outline-none transition placeholder:text-transparent focus:border-ink ${local.controlClass ?? ""}`}
        classList={{ [fieldErrorControlClass]: Boolean(local.error) }}
        onInput={(event) => local.onInput?.(event.currentTarget.value)}
        placeholder={local.placeholder ?? local.label}
        value={local.value ?? ""}
      />
      <Show when={local.error}>
        {(error) => <p class={fieldErrorClass}>{error()}</p>}
      </Show>
    </label>
  );
}
