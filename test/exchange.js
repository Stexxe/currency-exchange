import {exchange} from '../src/exchange';

const expect = require('chai').expect;

describe('Exchanging currencies', () => {
  it('Should convert money from source currency to target one', () => {
    expect(exchange({value: 30}, {value: 15}, 10)).to.eql(20);
  });
});