const convert = (valueFrom, valueTo, moneyFrom) => {
  return valueFrom / valueTo * moneyFrom;
};

const exchange = (currencies, currencyFrom, currencyTo, moneyFrom) => {
  const findCurrency = currency => currencies.find(data => data.code === currency);

  return convert(
    findCurrency(currencyFrom).value,
    findCurrency(currencyTo).value,
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
  }).then(currencies => {
    return currencies.concat({
      code: 'RUR',
      name: 'Российский рубль',
      value: 1,
    })
  })
};

const fillSelect = (element, currencies) => {
  currencies.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.innerText = currency.name;

    element.appendChild(option);
  })
};

const selectedCurrency = element => {
  return element.options[element.selectedIndex].value;
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
    const currencyFrom = document.getElementById('currency-from');
    const currencyTo = document.getElementById('currency-to');
    const moneyFrom = document.getElementById('money-from');
    const moneyTo= document.getElementById('money-to');

    moneyFrom.addEventListener('input', e => {
      const money = Number.parseFloat(e.target.value);

      if (!isNaN(money)) {
        moneyTo.value = exchange(
          currencies,
          selectedCurrency(currencyFrom),
          selectedCurrency(currencyTo),
          money
        ).toFixed(2);
      }
    });

    fillSelect(currencyFrom, currencies);
    fillSelect(currencyTo, currencies);

  });
});