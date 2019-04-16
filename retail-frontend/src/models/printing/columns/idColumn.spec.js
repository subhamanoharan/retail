import lodash from 'lodash';

import IdColumn from './idColumn';
import cartItemFactory from './../../cartItemFactory';

describe('IdColumn', () => {
  const generateCartItems = (n) => lodash.times(n, (index) => cartItemFactory({name: 'blah', id: index}));

  it('should format line when there is one item', () => {
    const cartItems = generateCartItems(1);

    const idColumn = new IdColumn(cartItems);

    expect(idColumn.getFormattedLine(0, '')).toEqual('1');
  });

  it('should format line when there are 10 items', () => {
    const cartItems = generateCartItems(10);

    const idColumn = new IdColumn(cartItems);

    expect(idColumn.getFormattedLine(0, '')).toEqual(' 1');
    expect(idColumn.getFormattedLine(9, '')).toEqual('10');
  });

  it('should format line when there are >10 items', () => {
    const cartItems = generateCartItems(12);

    const idColumn = new IdColumn(cartItems);

    expect(idColumn.getFormattedLine(0, '')).toEqual(' 1');
    expect(idColumn.getFormattedLine(9, '')).toEqual('10');
    expect(idColumn.getFormattedLine(10, '')).toEqual('11');
  });

  it('should format line when there are >100 items', () => {
    const cartItems = generateCartItems(102);

    const idColumn = new IdColumn(cartItems);

    expect(idColumn.getFormattedLine(0, '')).toEqual('  1');
    expect(idColumn.getFormattedLine(99, '')).toEqual('100');
    expect(idColumn.getFormattedLine(100, '')).toEqual('101');
  });
});
