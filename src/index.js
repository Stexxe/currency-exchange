const calcRate = (valueFrom, valueTo) => {
  return valueFrom / valueTo;
};

const convert = (rate, moneyFrom) => {
  return rate * moneyFrom;
};

const exchange = (currencies, currencyFrom, currencyTo, moneyFrom) => {
  const findCurrency = currency => currencies.find(data => data.code === currency);
  return convert(
    calcRate(findCurrency(currencyFrom).value, findCurrency(currencyTo).value),
    moneyFrom
  )
};

const fetchCurrencies = (url) => {
  return fetch(url).then(response => {
    return response.json();
  }).then(json => {
    return Object.keys(json.Valute).map(code => ({
      code,
      name: json.Valute[code].Name,
      value: json.Valute[code].Value,
    }))
  })
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', {scope: '/'}).then((e) => {
      console.log('SW registered: ', e);
    }).catch((error) => {
      console.log('SW registration failed: ', error);
    })
  });
}

window.addEventListener('load', () => {
  fetchCurrencies('https://www.cbr-xml-daily.ru/daily_json.js').then(currencies => {
    console.log(exchange(currencies, 'USD', 'EUR', 5));
  });
});