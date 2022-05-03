import dayjs from 'dayjs';

type DateFormatter = (value: string | Date) => string;

export const dateFormat: DateFormatter = (
  value: string | Date,
  format = 'YYYY/MM/DD'
) => {
  let dateStr = '';
  if (value instanceof Date) {
    dateStr = dayjs(value).format(format);
  } else {
    const date = dayjs(value);
    if (date.isValid()) {
      dateStr = date.format(format);
    }
  }

  return dateStr;
};

declare module '#app' {
  interface NuxtApp {
    $dateFormat: DateFormatter;
  }
}
export default defineNuxtPlugin(() => ({ provide: { dateFormat } }));
