const DEFAULT_LOCALE = 'cs-CZ';

export const parseIsoDate = (value?: string): Date | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value?: string, locale = DEFAULT_LOCALE): string | null => {
  const parsed = parseIsoDate(value);
  if (!parsed) {
    return null;
  }

  return new Intl.DateTimeFormat(locale).format(parsed);
};

export const isDateWithinWindow = (
  referenceDate: Date,
  start?: string,
  end?: string,
): boolean => {
  const startDate = parseIsoDate(start);
  const endDate = parseIsoDate(end);

  if (!startDate && !endDate) {
    return false;
  }

  const referenceTime = referenceDate.getTime();

  if (startDate && referenceTime < startDate.getTime()) {
    return false;
  }

  if (endDate && referenceTime > endDate.getTime()) {
    return false;
  }

  return true;
};

interface PromotionWindowLabelParams {
  start?: string;
  end?: string;
  fallback?: string;
  locale?: string;
}

export const formatPromotionWindowLabel = ({
  start,
  end,
  fallback,
  locale = DEFAULT_LOCALE,
}: PromotionWindowLabelParams): string | null => {
  const formattedStart = formatDate(start, locale);
  const formattedEnd = formatDate(end, locale);

  if (formattedStart && formattedEnd) {
    return formattedStart + ' - ' + formattedEnd;
  }

  if (formattedStart) {
    return formattedStart;
  }

  if (formattedEnd) {
    return formattedEnd;
  }

  return formatDate(fallback, locale);
};
