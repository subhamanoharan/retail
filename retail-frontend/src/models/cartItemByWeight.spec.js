import CartItemByWeight from './cartItemByWeight';

describe('CartItemByWeight', () => {
  const data = {name: 'some', barcode: 'abcd', quantity: 76, sp: 10, id: 1, weight: 10};
  const dataWithTax = {name: 'some', barcode: 'abcd', quantity: 76, sp: 10, id: 1, weight: 10, tax_percent: 5};
  const anotherData = {name: 'where', barcode: 'asd', sp: 10, id: 2, weight: 1};

  const cartItemByWeight = new CartItemByWeight(data);
  const cartItemWithDefaultQuantity = new CartItemByWeight(anotherData);

  it('should get number of units', () => {
    expect(cartItemByWeight.getNoOfUnitsToDisplay()).toEqual('10 kg * 76');
  });

  it('should get default number of units', () => {
    expect(cartItemWithDefaultQuantity.getNoOfUnitsToDisplay()).toEqual('1 kg * 1');
  });

  it('should get price', () => {
    expect(cartItemByWeight.price()).toEqual(7600);
  });

  it('should get tax', () => {
    const taxItem = new CartItemByWeight(dataWithTax)
    expect(taxItem.tax()).toEqual(361.9047619047615);
    expect(taxItem.hasTax()).toEqual(true);
  });

  describe('matches', () => {
    it('should return true if barcodes and weights match', () => {
      const anotherCartItem = new CartItemByWeight({...data, quantity: 13});
      expect(cartItemByWeight.matches(anotherCartItem)).toBe(true);
    });

    it('should return false if barcodes match but weights dont match', () => {
      const anotherCartItem = new CartItemByWeight({...data, weight: 13});
      expect(cartItemByWeight.matches(anotherCartItem)).toBe(false);
    });

    it('should return true if weights match but barcodes dont match', () => {
      const anotherCartItem = new CartItemByWeight({...data, barcode: 'someblah'});
      expect(cartItemByWeight.matches(anotherCartItem)).toBe(false);
    });

    it('should return false if barcodes and weights dont match', () => {
      expect(cartItemByWeight.matches(cartItemWithDefaultQuantity)).toBe(false);
    });
  });
});
