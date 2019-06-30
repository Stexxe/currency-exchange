export const getCurrenciesFromJSON = (json) => {
  return Object.values(json.Valute)
    .map(({CharCode, Name, Nominal, Value}) => ({
      code: CharCode,
      name: Name,
      value: Value / Nominal,
    })).concat({
      code: 'RUB',
      name: 'Российский рубль',
      value: 1,
    }).sort((a, b) => a.name.localeCompare(b.name));
};

export const findCurrencyByCode = (currencies, code) => {
  return currencies.find(currency => currency.code === code);
};