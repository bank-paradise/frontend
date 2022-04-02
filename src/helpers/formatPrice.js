export function formatPrice(price, currency) {
  var formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency || "USD",
  });

  return formatter.format(Number(price));
}
