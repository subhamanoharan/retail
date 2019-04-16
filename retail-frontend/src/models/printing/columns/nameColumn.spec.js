import NameColumn from './nameColumn';
import cartItemFactory from './../../cartItemFactory';

describe('NameColumn', () => {
  const item1 = cartItemFactory({name: 'Marie'});
  const item2 = cartItemFactory({name: 'Maries'});

  describe('when there is one item', () => {
    it('which fits', () => {
      const maxLength = item1.name.length;
      const nameColumn = new NameColumn([item1], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Marie']);
    });

    it('should wrap when it does not fit', () => {
      const maxLength = item2.name.length/2;
      const nameColumn = new NameColumn([item2], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Mar', 'ies']);
    });

    it('should wrap when it does not fit with extra spaces', () => {
      const maxLength = item1.name.length - 2;
      const nameColumn = new NameColumn([item1], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Mar', 'ie ']);
    });
  });

  describe('when there are multiple items', () => {
    it('when all items fit', () => {
      const maxLength = item2.name.length;
      const nameColumn = new NameColumn([item1, item2], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Marie ']);
      expect(nameColumn.getFormattedLines(1, '')).toEqual(['Maries']);
    });

    it('when some items don\'t fit', () => {
      const maxLength = item1.name.length;
      const nameColumn = new NameColumn([item1, item2], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Marie']);
      expect(nameColumn.getFormattedLines(1, '')).toEqual(['Marie', 's    ']);
    });

    it('when all items don\'t fit', () => {
      const maxLength = 2;
      const nameColumn = new NameColumn([item1, item2], maxLength);

      expect(nameColumn.getFormattedLines(0, '')).toEqual(['Ma', 'ri', 'e ']);
      expect(nameColumn.getFormattedLines(1, '')).toEqual(['Ma', 'ri', 'es']);
    });
  });
});
