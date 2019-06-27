import {fetchCurrencies} from './currencies';
import {exchange} from './exchange';
import {fillSelect, selectedCurrency} from './dom';

const recalcFn = (currencyFrom, currencyTo, moneyFrom, moneyTo, currencies) => {
  return () => {
    const fromValue = Number.parseFloat(moneyFrom.value);
    const toValue = Number.parseFloat(moneyTo.value);

    if (!isNaN(toValue)) {
      moneyFrom.value = exchange(
        currencies,
        selectedCurrency(currencyTo),
        selectedCurrency(currencyFrom),
        toValue
      ).toFixed(2);
    }

    if (!isNaN(fromValue)) {
      moneyFrom.value = exchange(
        currencies,
        selectedCurrency(currencyFrom),
        selectedCurrency(currencyTo),
        fromValue
      ).toFixed(2);
    }
  };
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
    const moneyTo = document.getElementById('money-to');

    fillSelect(currencyFrom, currencies);
    fillSelect(currencyTo, currencies);

    const recalc = recalcFn(currencyFrom, currencyTo, moneyFrom, moneyTo, currencies);

    currencyFrom.addEventListener('change', () => {
      moneyTo.dispatchEvent(new Event('input'));
    });


    currencyTo.addEventListener('change', () => {
      moneyTo.dispatchEvent(new Event('input'));
    });

    moneyFrom.addEventListener('input', e => {
      const money = Number.parseFloat(e.target.value);

      if (!isNaN(money)) {
        moneyTo.value = exchange(
          currencies,
          selectedCurrency(currencyTo),
          selectedCurrency(currencyFrom),
          money
        ).toFixed(2);
      }
    });
    moneyTo.addEventListener('input', e => {
      const money = Number.parseFloat(e.target.value);

      if (!isNaN(money)) {
        moneyFrom.value = exchange(
          currencies,
          selectedCurrency(currencyFrom),
          selectedCurrency(currencyTo),
          money
        ).toFixed(2);
      }
    });


    // moneyFrom.addEventListener('input', e => {
    //   const money = Number.parseFloat(e.target.value);
    //
    //   if (!isNaN(money)) {
    //     moneyTo.value = exchange(
    //       currencies,
    //       selectedCurrency(currencyFrom),
    //       selectedCurrency(currencyTo),
    //       money
    //     ).toFixed(2);
    //   }
    // });
    //
    // moneyTo.addEventListener('input', e => {
    //   const money = Number.parseFloat(e.target.value);
    //
    //   if (!isNaN(money)) {
    //     moneyFrom.value = exchange(
    //       currencies,
    //       selectedCurrency(currencyTo),
    //       selectedCurrency(currencyFrom),
    //       money
    //     ).toFixed(2);
    //   }
    // });
    //
    // currencyFrom.addEventListener('change', e => {
    //   const money = Number.parseFloat(moneyFrom.value);
    //
    //   if (!isNaN(money)) {
    //     moneyTo.value = exchange(
    //       currencies,
    //       selectedCurrency(currencyFrom),
    //       selectedCurrency(currencyTo),
    //       money
    //     ).toFixed(2);
    //   }
    // });


  });
});