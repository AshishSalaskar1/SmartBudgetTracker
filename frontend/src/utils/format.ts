const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatCompactINR(value: number) {
  const safe = Number(value);
  if (!Number.isFinite(safe)) return "0";
  const abs = Math.abs(safe);
  const sign = safe < 0 ? "-" : "";
  if (abs >= 100000) {
    return `${sign}${(abs / 100000).toFixed(abs >= 1000000 ? 0 : 1)}L`;
  }
  if (abs >= 1000) {
    return `${sign}${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}k`;
  }
  return `${sign}${numberFormatter.format(abs)}`;
}

export function formatCurrencyINR(value: number) {
  const safe = Number(value);
  return currencyFormatter.format(Number.isFinite(safe) ? safe : 0);
}

export function formatNumberINR(value: number) {
  const safe = Number(value);
  return numberFormatter.format(Number.isFinite(safe) ? safe : 0);
}
