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
        'Quotation                ',
        expect.any(String),
        '-------------------------',
        '1 Marie          2  24.00',
        '2 Sunfeast      11 137.50',
        '-------------------------',
        '                   161.50'
      ]
    )
  });

  it('should give pretty lines with wrapped lines', () => {
    const cartItem1 = {name: 'Marie', sp: 12, quantity: 2};
    const cartItem2 = {name: 'Sunfeast', sp: 12.5, quantity: 11};
    const cartItem3 = {name: 'Rice-variety Ponni', sp: 10.5, quantity: 10, byWeight: true, weight: 0.5};
    const cart = new Cart([cartItem1, cartItem2, cartItem3]);
    const lineGenerator = new LineGenerator(25);
    expect(lineGenerator.generate(cart)).toEqual(
      [
        '   M.S.Gurusamy Stores   ',
        '  124, Kamarajar Salai   ',
        '     Madurai-625009      ',
        'Quotation                ',
        expect.any(String),
        '-------------------------',
        '1 Marie          2  24.00',
        '2 Sunfeast      11 137.50',
        '3 Rice-var 500g*10  52.50',
        '  iety Pon               ',
        '  ni                     ',
        '-------------------------',
        '                   214.00'
      ]
    )
  });
});
