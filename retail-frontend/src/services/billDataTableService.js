import cartItemFactory from '../models/cartItemFactory';

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
      }];
  }

  generateData(items){
    return items
      .map(cartItemFactory)
      .map((item, i) => [i+1, item.name, item.sp, item.getNoOfUnitsToDisplay(), item.price()]);
  }
}

export default new BillDataTableService();
