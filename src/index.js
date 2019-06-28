import {fetchCurrencies} from './currencies';
import {fillSelectFn, selectedCurrencyFn, updateMoneyFn} from './dom';

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
    const currencySource = document.getElementById('currency-from');
    const currencyTarget = document.getElementById('currency-to');
    const moneySource = document.getElementById('money-from');
    const moneyTarget = document.getElementById('money-to');

    const fillSelect = fillSelectFn(currencies);
    fillSelect(currencySource);
    fillSelect(currencyTarget);

    const selectedCurrency = selectedCurrencyFn(currencies);
    const updateMoney = updateMoneyFn(selectedCurrency, currencySource, currencyTarget, moneySource, moneyTarget);

    moneySource.addEventListener('input', updateMoney);
    currencySource.addEventListener('change', updateMoney);
    currencyTarget.addEventListener('change', updateMoney);
  });
});