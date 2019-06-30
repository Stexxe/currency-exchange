export const ratesFromJSON = (json) => {
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

export const fetchCurrencies = (url) => {
  return fetch(url).then(response => {
    return response.json();
  }).then(ratesFromJSON)
};

export const findCurrencyByCode = (currencies, code) => {
  return currencies.find((currency) => currency.code === code);
};