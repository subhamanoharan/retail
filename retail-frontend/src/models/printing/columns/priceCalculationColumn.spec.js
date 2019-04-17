import PriceCalculationColumn from './priceCalculationColumn';
import cartItemFactory from './../../cartItemFactory';

describe('PriceCalculationColumn', () => {
  const item1 = cartItemFactory({quantity: 2, sp: 123});
  const item2 = cartItemFactory({quantity: 1, sp: 223.5});
  const item3 = cartItemFactory({quantity: 1, sp: 223.75});
  const item4 = cartItemFactory({quantity: 3, sp: 224.752});
  const item5 = cartItemFactory({quantity: 3, sp: 10000});
  const item6 = cartItemFactory({quantity: 33, sp: 223.75});

  describe('single item', () => {
    it('should format line with whole number price', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item1]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('123.00*2');
    });

    it('should format line with decimal price with 1 decimal', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item2]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('223.50*1');
    });

    it('should format line with decimal price with 2 decimal', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item3]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('223.75*1');
    });

    it('should format line with decimal price with >2 decimal', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item4]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('224.75*3');
    });
  });

  describe('multiple items', () => {
    it('should format line with only whole numbers', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item1, item5]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('  123.00*2');
      expect(priceCalculationColumn.getFormattedLine(1, '')).toEqual('10000.00*3');
    });

    it('should format line with whole and decimal numbers', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item1, item2]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual('123.00*2');
      expect(priceCalculationColumn.getFormattedLine(1, '')).toEqual('223.50*1');
    });

    it('should format line with multiple decimal numbers', () => {
      const priceCalculationColumn = new PriceCalculationColumn([item2, item6]);

      expect(priceCalculationColumn.getFormattedLine(0, '')).toEqual(' 223.50*1');
      expect(priceCalculationColumn.getFormattedLine(1, '')).toEqual('223.75*33');
    });
  });
});
