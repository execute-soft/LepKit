export type FormatDateOptions = Intl.DateTimeFormatOptions & {
  locale?: string;
};

export function formatDate(value: Date | string | number, options: FormatDateOptions = {}) {
  const { locale = "en-US", ...dateOptions } = options;
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, dateOptions).format(date);
}

