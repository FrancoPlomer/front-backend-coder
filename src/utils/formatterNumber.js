export const formatterNumber = (number) => {
  return Intl.NumberFormat('es-ar', { style: "currency", currency: "ARS", maximumFractionDigits: 2 }).format(number)
};
