import {ratesFromJSON} from '../src/currencies';

const expect = require('chai').expect;

describe('Currencies rates', () => {
  describe('Transforming from CBR json', () => {
    it('Should add RUB currency rate', () => {
      expect(ratesFromJSON({
        Valute: {
          USD: {
            CharCode: "USD",
            Name: "Доллар США",
            Nominal: 1,
            Value: 60,
          }
        }
      })).to.eql([
        {
          code: 'USD',
          name: 'Доллар США',
          value: 60,
        },
        {
          code: 'RUB',
          name: 'Российский рубль',
          value: 1,
        },
      ]);
    });

    it('Should sort rates by currency name', () => {
      expect(ratesFromJSON({
        Valute: {
          JPY: {
            CharCode: "JPY",
            Name: "Японских иен",
            Nominal: 1,
            Value: 40,
          }
        }
      })).to.eql([
        {
          code: 'RUB',
          name: 'Российский рубль',
          value: 1,
        },
        {
          code: 'JPY',
          name: 'Японских иен',
          value: 40,
        }
      ]);
    });

    it('Should should recalculate value based on nominal', () => {
      expect(ratesFromJSON({
        Valute: {
          JPY: {
            CharCode: 'SEK',
            Name: 'Шведских крон',
            Nominal: 10,
            Value: 70,
          },
        },
      }).find(currency => currency.code === 'SEK')).to.eql({
        code: 'SEK',
        name: 'Шведских крон',
        value: 7,
      });
    });


  });
});