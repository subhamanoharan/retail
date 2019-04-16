import billDataTableService from './billDataTableService';

describe('BillDataTableService', () => {
  it('generate columns', () => {
    expect(billDataTableService.getColumns()).toEqual(
      [
        {
          name: "No.",
          options: {filter: false, sort: false}
        },
        {
          name: "Item",
          options: {filter: false, sort: false}
        },
        {
          name: "Price",
          options: {filter: false, sort: false}
        },{
          name: "Quantity",
          options: {filter: false, sort: false}
        },{
          name: "Total",
          options: {filter: false, sort: false}
        }]
    );
  });

  it('should generate data', () => {
    const items = [
      {name: 'item1', sp: 12, quantity: 2},
      {name: 'item2', sp: 10, quantity: 3},
      {name: 'item3', sp: 10, quantity: 3, byWeight: true, weight: 5}
    ];
    expect(billDataTableService.generateData(items)).toEqual([
      [1, 'item1', 12, '2', 24],
      [2, 'item2', 10, '3', 30],
      [3, 'item3', 10, '5 * 3', 150]
    ]);
  });

  it('should generate options', () => {
    const selectionBar = 'selectionBar';
    const toolbar = 'toolbar';
    expect(billDataTableService.generateOptions(selectionBar, toolbar)).toEqual({
      filterType: 'checkbox', search: false, pagination: false,
      filter: false, viewColumns: false, print: false, download: false,
      serverSide: true,
      customToolbar: toolbar,
      customToolbarSelect:selectionBar
    });
  });
});
