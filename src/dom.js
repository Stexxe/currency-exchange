import {findCurrencyByCode} from './currencies';
import {exchange} from './exchange';

const createOption = ({code, name}) => {
  const option = document.createElement('option');
  option.value = code;
  option.innerText = name;
  return option;
};

export const fillSelectFn = currencies => {
  return element => {
    currencies.forEach(currency => {
      element.appendChild(createOption(currency));
    });
  }
};

const selectedOption = select => {
  return select.options[select.selectedIndex];
};

export const selectedCurrencyFn = currencies => {
  return element => findCurrencyByCode(currencies, selectedOption(element).value);
};

export const updateMoneyFn = (selectedCurrency, currencyFrom, currencyTo, moneyFrom, moneyTo) => {
  return () => {
    const money = moneyFrom.value;

    if (!isNaN(money)) {
      moneyTo.value = exchange(
          selectedCurrency(currencyFrom),
          selectedCurrency(currencyTo),
          money
      ).toFixed(2);
    }
  }
};