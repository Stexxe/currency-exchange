const convert = (valueFrom, valueTo, moneyFrom) => {
  return valueFrom / valueTo * moneyFrom;
};

export const exchange = (currencies, currencyFrom, currencyTo, moneyFrom) => {
  const findCurrency = currency => currencies.find(data => data.code === currency);

  return convert(
    findCurrency(currencyFrom).value,
    findCurrency(currencyTo).value,
    moneyFrom
  )
};