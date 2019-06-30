import {fillSelect, getSelectedCurrencyFn, updateMoneyFn} from '../src/dom';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
const expect = require('chai').expect;

describe('DOM', () => {
  let selectSource;
  let selectTarget;
  const currencies = [
    {code: 'RUB', name: 'Рубль', value: 1},
    {code: 'USD', name: 'Доллар', value: 60}
  ];
  const getSelectedCurrency = getSelectedCurrencyFn(currencies);

  beforeEach(() => {
    return JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
      .then(dom => {
        global.window = dom.window;
        global.document = dom.window.document;
        selectSource = document.createElement('select');
        selectTarget = document.createElement('select');
      });
  });

  it('Should create option from each currency in select', () =>  {
    fillSelect(currencies, selectSource);

    const [rub, usd] = Array.from(selectSource.options);
    expect([rub.value, rub.innerText]).to.eql(['RUB', 'Рубль']);
    expect([usd.value, usd.innerText]).to.eql(['USD', 'Доллар']);
  });

  it('Should find selected currency', () => {
    fillSelect(currencies, selectSource);
    selectSource.value = 'USD';
    expect(getSelectedCurrency(selectSource)).to.eql(
      {code: 'USD', name: 'Доллар', value: 60},
    );
  });

  describe('Updating target money input', () => {
    let moneyFrom;
    let moneyTo;
    let update;

    beforeEach(() => {
      fillSelect(currencies, selectSource);
      fillSelect(currencies, selectTarget);
      moneyFrom = document.createElement('input');
      moneyTo = document.createElement('input');

      update = updateMoneyFn(
        getSelectedCurrency,
        selectSource,
        selectTarget,
        moneyFrom,
        moneyTo
      );
    });

    it('Should convert money in source currency to target one', () => {
      selectSource.value = 'USD';
      selectTarget.value = 'RUB';
      moneyFrom.value = '5';
      update();
      expect(moneyTo.value).to.eql('300.00');
    });

    it('Should update nothing if cannot convert money', () => {
      update();
      expect(moneyTo.value).to.eql('');
    });
  });
});