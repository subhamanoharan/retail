import ValueColumn from './valueColumn';

describe('ValueColumn', () => {
  const item1 = 23.53
  const item2 = 123.5
  const item3 = 1223
  const item4 = 1223.345

  describe('single item', () => {
    it('should format line with whole number price', () => {
      const valueColumn = new ValueColumn([item3]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('1223.00');
    });

    it('should format line with decimal price with 1 decimal', () => {
      const valueColumn = new ValueColumn([item2]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('123.50');
    });

    it('should format line with decimal price with 2 decimal', () => {
      const valueColumn = new ValueColumn([item1]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('23.53');
    });

    it('should format line with decimal price with >2 decimal', () => {
      const valueColumn = new ValueColumn([item4]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('1223.35');
    });
  });

  describe('multiple items', () => {
    it('should format line with only whole numbers', () => {
      const valueColumn = new ValueColumn([246, 30000]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('  246.00');
      expect(valueColumn.getFormattedLine(1, '')).toEqual('30000.00');
    });

    it('should format line with whole and decimal numbers', () => {
      const valueColumn = new ValueColumn([246, 223.5]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual('246.00');
      expect(valueColumn.getFormattedLine(1, '')).toEqual('223.50');
    });

    it('should format line with multiple decimal numbers', () => {
      const valueColumn = new ValueColumn([223.5, 7383.75]);

      expect(valueColumn.getFormattedLine(0, '')).toEqual(' 223.50');
      expect(valueColumn.getFormattedLine(1, '')).toEqual('7383.75');
    });
  });
});
