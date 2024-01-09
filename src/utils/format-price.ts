function formatPrice(price: number, locale: string = 'sv-SE'): string {
  return new Intl.NumberFormat(locale, {}).format(price);
}

export default formatPrice;
