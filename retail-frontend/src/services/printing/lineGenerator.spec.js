import {LineGenerator} from './lineGenerator';
import Cart from '../../models/immutableCart';
import PriceColumn from '../../models/printing/columns/priceColumn';
import constants from '../../constants';

const {STORE_NAME, ADDRESS} = constants;

describe('CartItemLineGenerator', () => {

  it('should give pretty lines', () => {
    const cartItem1 = {name: 'Marie', sp: 12, quantity: 2};
    const cartItem2 = {name: 'Sunfeast', sp: 12.5, quantity: 11};
    const cart = new Cart([cartItem1, cartItem2]);
    const lineGenerator = new LineGenerator(25);
    expect(lineGenerator.generate(cart)).toEqual(
      [
        '   M.S.Gurusamy Stores   ',
        '  124, Kamarajar Salai   ',
        '     Madurai-625009      ',
        '-------------------------',
        '1 Marie       12*2     24',
        '2 Sunfeas 12.50*11 137.50',
        '  t                      '
      ]
    )
  });

  it.skip('should give pretty lines with both wrapped', () => {
    const cartItem1 = {name: 'Marie', sp: 12, quantity: 2};
    const cartItem2 = {name: 'Sunfeast', sp: 12.5, quantity: 11};
    const cart = new Cart([cartItem1, cartItem2]);
    const lineGenerator = new LineGenerator(10);
    expect(lineGenerator.generate(cart)).toEqual(
      [
        '1 Marie   24.00',
        '2 Sunfea 137.50',
        '  st           ',
      ]
    )
  });
});
