import QuantityColumn from './quantityColumn';
import cartItemFactory from './../../cartItemFactory';

describe('QuantityColumn', () => {
  const item1 = cartItemFactory({quantity: 2});
  const item2 = cartItemFactory({quantity: 1});
  const item3 = cartItemFactory({quantity: 1, byWeight: true, weight: 0.25});
  const item4 = cartItemFactory({quantity: 5, byWeight: true, weight: 0.25});

  describe('single item', () => {
    it('should format line with quantity', () => {
      const quantityColumn = new QuantityColumn([item1]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('2');
    });

    it('should format line with weight, units when quantity=1', () => {
      const quantityColumn = new QuantityColumn([item3]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('250g');
    });
    it('should format line with weight, units when quantity>1', () => {
      const quantityColumn = new QuantityColumn([item4]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('250g*5');
    });
  });

  describe('multiple items', () => {
    it('should format line with only whole numbers', () => {
      const quantityColumn = new QuantityColumn([item1, item2]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('2');
      expect(quantityColumn.getFormattedLine(1, '')).toEqual('1');
    });

    it('should format line with units and weight when quantity = 1', () => {
      const quantityColumn = new QuantityColumn([item1, item2, item3]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('   2');
      expect(quantityColumn.getFormattedLine(1, '')).toEqual('   1');
      expect(quantityColumn.getFormattedLine(2, '')).toEqual('250g');
    });

    it('should format line with units and weight when quantity > 1', () => {
      const quantityColumn = new QuantityColumn([item1, item2, item3, item4]);

      expect(quantityColumn.getFormattedLine(0, '')).toEqual('     2');
      expect(quantityColumn.getFormattedLine(1, '')).toEqual('     1');
      expect(quantityColumn.getFormattedLine(2, '')).toEqual('  250g');
      expect(quantityColumn.getFormattedLine(3, '')).toEqual('250g*5');
    });
  });
});
