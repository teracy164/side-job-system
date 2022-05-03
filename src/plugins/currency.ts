type Currency = (value: number | string) => string;

export const currency: Currency = (value: number | string) => {
  const amount = Number(value);

  if (isNaN(amount)) return '';

  const format = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  return format.format(amount);
};

declare module '#app' {
  interface NuxtApp {
    $currency: Currency;
  }
}
export default defineNuxtPlugin(() => ({ provide: { currency } }));
