export const fetchCurrencies = (url) => {
  return fetch(url).then(response => {
    return response.json();
  }).then(json => {
    return Object.keys(json.Valute).map(code => ({
      code,
      name: json.Valute[code].Name,
      value: json.Valute[code].Value / json.Valute[code].Nominal,
    }))
  }).then(currencies => {
    return currencies.concat({
      code: 'RUR',
      name: 'Российский рубль',
      value: 1,
    })
  }).then(currencies => {
    return currencies.sort((a, b) => a.name.localeCompare(b.name));
  })
};