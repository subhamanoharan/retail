import priceCalculator from './priceCalculator';

class BillDataTableService {

  generateOptions(selectionBar, toolbar){
    return {
      filterType: 'checkbox', search: false, pagination: false,
      filter: false, viewColumns: false, print: false, download: false,
      serverSide: true,
      customToolbar: toolbar,
      customToolbarSelect:selectionBar
    };
  }

  getColumns(){
    return [
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
      }];
  }

  generateData(items){
    return items.map((item) => [item.name, item.sp, item.quantity, priceCalculator([item])]);
  }
}

export default new BillDataTableService();
