import priceCalculator from './priceCalculator';

describe('priceCalculator', () => {
  const item1 = {sp: 10, quantity: 2};
  const item2 = {sp: 5, quantity: 10};

  it('when there is one item', () => {
    expect(priceCalculator([item1])).toBe(20);
  });

  it('when there are multiple items', () => {
    expect(priceCalculator([item1, item2])).toBe(70);
  });
});
