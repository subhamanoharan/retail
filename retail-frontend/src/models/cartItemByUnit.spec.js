import CartItemByUnit from './cartItemByUnit';

describe('CartItemByUnit', () => {
  const data = {name: 'some', barcode: 'abcd', quantity: 76, sp: 10, id: 1};
  const anotherData = {name: 'where', barcode: 'asd', sp: 10, id: 2};

  const cartItemByUnit = new CartItemByUnit(data);
  const cartItemWithDefaultQuantity = new CartItemByUnit(anotherData);

  it('should get number of units', () => {
    expect(cartItemByUnit.getNoOfUnits()).toEqual('76');
  });

  it('should get default number of units', () => {
    expect(cartItemWithDefaultQuantity.getNoOfUnits()).toEqual('1');
  });

  it('should get price', () => {
    expect(cartItemByUnit.price()).toEqual(760);
  });

  describe('matches', () => {
    it('should return true if barcodes match', () => {
      const cartItemWithDifferentQuantity = new CartItemByUnit({...data, quantity: 13});
      expect(cartItemByUnit.matches(cartItemWithDifferentQuantity)).toBe(true);
    });

    it('should return false if barcodes dont match', () => {
      expect(cartItemByUnit.matches(cartItemWithDefaultQuantity)).toBe(false);
    });
  });
});
