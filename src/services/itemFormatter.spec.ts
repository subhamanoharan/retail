import itemFormatter from './itemFormatter';

describe('Item Formatter', () => {
  it('should transform item to data for db updates', () => {
    const item = {name: 'hI', sp: 12, barcode: 'BlAh', tax_percent: 5};

    expect(itemFormatter(item)).toEqual({...item, barcode: 'blah'});
  })

  it('should transform item by weight to data for db updates', () => {
    const item = {name: 'hI', sp: 12, barcode: 'BlAh', byWeight: true, category: 'Rice'};

    expect(itemFormatter(item)).toEqual({...item, barcode: 'blah', byWeight: true, category: 'Rice'});
  })
})
