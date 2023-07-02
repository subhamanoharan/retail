import {LineGenerator} from './lineGenerator';
import Cart from '../../models/immutableCart';
import PriceColumn from '../../models/printing/columns/priceColumn';
import constants from '../../constants';

const {STORE_NAME, ADDRESS, WELCOME} = constants;

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
        {emphasis: true, text: '                   161.50'},
        '-------------------------',
        WELCOME
      ]
    )
  });

  it('should give pretty lines with tax', () => {
    const cartItem1 = {name: 'Marie', sp: 12, quantity: 2};
    const cartItem2 = {name: 'Sunfeast', sp: 12.5, quantity: 11};
    const cartItem3 = {name: 'Hide and Seek', sp: 10.5, quantity: 11, tax_percent: 18};
    const cartItem4 = {name: 'Hide', sp: 8, quantity: 4, tax_percent: 18};
    const cartItem5 = {name: 'Rice-variety Ponni', sp: 10.5, quantity: 10, byWeight: true, weight: 0.5, tax_percent: 5};
    const cart = new Cart([cartItem1, cartItem2, cartItem3, cartItem4, cartItem5]);
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
        '3 Hide and      11 115.50',
        '   Seek                  ',
        '4 Hide           4  32.00',
        '5 Rice-var 500g*10  52.50',
        '  iety Pon               ',
        '  ni                     ',
        '-------------------------',
        {emphasis: true, text: '                   361.50'},
        '-------------------------',
        'CGST 2.5%  50.00  1.25   ',
        'SGST 2.5%  50.00  1.25   ',
        'CGST   9% 125.00 11.25   ',
        'SGST   9% 125.00 11.25   ',
        WELCOME
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
        {emphasis: true, text: '                   214.00'},
        '-------------------------',
        WELCOME
      ]
    )
  });
});
