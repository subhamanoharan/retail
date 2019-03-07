import itemFormatter from './itemFormatter';

describe('Item Formatter', () => {
  it('should transform item to data for db updates', () => {
    const item = {name: 'hI', sp: 12, barcode: 'BlAh'};

    expect(itemFormatter(item)).toEqual({...item, barcode: 'blah'});
  })
})
