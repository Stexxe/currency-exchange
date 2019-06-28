import {fetchCurrencies} from './currencies';
import {fillSelect, selectedCurrencyFn, updateMoneyFn} from './dom';
import * as db from './db';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((e) => {
      console.log('SW registered: ', e);
    }).catch((error) => {
      console.log('SW registration failed: ', error);
    })
  });
}

const react = currencies => {
    const currencySource = document.getElementById('currency-from');
    const currencyTarget = document.getElementById('currency-to');
    const moneySource = document.getElementById('money-from');
    const moneyTarget = document.getElementById('money-to');

    fillSelect(currencies, currencySource);
    fillSelect(currencies, currencyTarget);

    const getSelectedCurrency = selectedCurrencyFn(currencies);
    const updateMoney = updateMoneyFn(getSelectedCurrency, currencySource, currencyTarget, moneySource, moneyTarget);

    moneySource.addEventListener('input', updateMoney);
    currencySource.addEventListener('change', updateMoney);
    currencyTarget.addEventListener('change', updateMoney);
};

window.addEventListener('load', () => {
	fetchCurrencies('https://www.cbr-xml-daily.ru/daily_json.js')
		.then(currencies => {
			return db.updateCurrencies(currencies);
		})
		.then(react)
		.catch(() => {
			db.fetchCurrencies().then(react);
		});
});