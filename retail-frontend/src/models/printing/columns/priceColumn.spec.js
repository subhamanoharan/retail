import PriceColumn from './priceColumn';
import CartItem from './../../cartItem';

describe('PriceColumn', () => {
  const item1 = new CartItem({quantity: 2, sp: 123});
  const item2 = new CartItem({quantity: 1, sp: 223.5});
  const item3 = new CartItem({quantity: 1, sp: 223.75});
  const item4 = new CartItem({quantity: 3, sp: 224.752});
  const item5 = new CartItem({quantity: 3, sp: 10000});
  const item6 = new CartItem({quantity: 33, sp: 223.75});

  describe('single item', () => {
    it('should format line with whole number price', () => {
      const priceColumn = new PriceColumn([item1]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('246');
    });

    it('should format line with decimal price with 1 decimal', () => {
      const priceColumn = new PriceColumn([item2]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('223.50');
    });

    it('should format line with decimal price with 2 decimal', () => {
      const priceColumn = new PriceColumn([item3]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('223.75');
    });

    it('should format line with decimal price with >2 decimal', () => {
      const priceColumn = new PriceColumn([item4]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('674.26');
    });
  });

  describe('multiple items', () => {
    it('should format line with only whole numbers', () => {
      const priceColumn = new PriceColumn([item1, item5]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('  246');
      expect(priceColumn.getFormattedLine(1, '')).toEqual('30000');
    });

    it('should format line with whole and decimal numbers', () => {
      const priceColumn = new PriceColumn([item1, item2]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual('   246');
      expect(priceColumn.getFormattedLine(1, '')).toEqual('223.50');
    });

    it('should format line with multiple decimal numbers', () => {
      const priceColumn = new PriceColumn([item2, item6]);

      expect(priceColumn.getFormattedLine(0, '')).toEqual(' 223.50');
      expect(priceColumn.getFormattedLine(1, '')).toEqual('7383.75');
    });
  });
});
