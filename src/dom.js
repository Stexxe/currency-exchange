export const fillSelect = (element, currencies) => {
  currencies.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.innerText = currency.name;

    element.appendChild(option);
  })
};

export const selectedCurrency = element => {
  return element.options[element.selectedIndex].value;
};