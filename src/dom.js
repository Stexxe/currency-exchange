import {findCurrencyByCode} from './currencies';
import {exchange} from './exchange';

const createOption = ({code, name}) => {
  const option = document.createElement('option');
  option.value = code;
  option.innerText = name;
  return option;
};

export const fillSelect = (currencies, element) => {
  currencies.forEach(currency => {
    element.appendChild(createOption(currency));
  });
};

const getSelectedOption = select => {
  return select.options[select.selectedIndex];
};

export const getSelectedCurrencyFn = currencies => {
  return element => findCurrencyByCode(currencies, getSelectedOption(element).value);
};

export const updateMoneyFn = (getSelectedCurrency, currencyFrom, currencyTo, moneyFrom, moneyTo) => {
  return () => {
    const money = moneyFrom.value;

    if (!isNaN(money)) {
      moneyTo.value = exchange(
          getSelectedCurrency(currencyFrom),
          getSelectedCurrency(currencyTo),
          money
      ).toFixed(2);
    }
  }
};