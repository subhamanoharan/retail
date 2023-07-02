import CartItemByUnit from './cartItemByUnit';

describe('CartItemByUnit', () => {
  const data = {name: 'some', barcode: 'abcd', quantity: 76, sp: 10, id: 1};
  const anotherData = {name: 'where', barcode: 'asd', sp: 10, id: 2};
  const dataWithTax = {name: 'where', barcode: 'asd', sp: 100, id: 2, tax_percent: 5};

  const cartItemByUnit = new CartItemByUnit(data);
  const cartItemWithDefaultQuantity = new CartItemByUnit(anotherData);

  it('should get number of units', () => {
    expect(cartItemByUnit.getNoOfUnitsToDisplay()).toEqual('76');
    expect(cartItemByUnit.hasTax()).toEqual(false);
  });

  it('should get default number of units', () => {
    expect(cartItemWithDefaultQuantity.getNoOfUnitsToDisplay()).toEqual('1');
  });

  it('should get price', () => {
    expect(cartItemByUnit.price()).toEqual(760);
  });

  it('should get tax', () => {
    const cartItemByUnit = new CartItemByUnit(dataWithTax)
    expect(cartItemByUnit.tax()).toEqual(4.761904761904759);
    expect(cartItemByUnit.hasTax()).toEqual(true);
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
