import LineGenerator from './lineGenerator';
import CartItem from '../cartItem';
import Cart from '../immutableCart';

describe('CartItemLineGenerator', () => {

  it('should give pretty lines', () => {
    const cartItem1 = new CartItem({name: 'Marie', sp: 12, quantity: 2});
    const cartItem2 = new CartItem({name: 'Sunfeast', sp: 12.5, quantity: 11});
    const cart = new Cart([cartItem1, cartItem2]);
    const lineGenerator = new LineGenerator(cart, 15);
    expect(lineGenerator.generate()).toEqual(
      [
        '1 Marie   24.00',
        '2 Sunfea 137.50',
        '  st           ',
      ]
    )
  });

  it('should give pretty lines with both wrapped', () => {
    const cartItem1 = new CartItem({name: 'Marie', sp: 12, quantity: 2});
    const cartItem2 = new CartItem({name: 'Sunfeast', sp: 12.5, quantity: 11});
    const cart = new Cart([cartItem1, cartItem2]);
    const lineGenerator = new LineGenerator(cart, 10);
    expect(lineGenerator.generate()).toEqual(
      [
        '1 Marie   24.00',
        '2 Sunfea 137.50',
        '  st           ',
      ]
    )
  });
});
