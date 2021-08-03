import lodash from 'lodash';

class ItemsDataTableService {

  generateOptions(selectionBar, toolbar){
    return {
      filterType: 'checkbox', pagination: false,
      filter: true, viewColumns: false, print: true, download: true,
      search: true,
      customToolbar: toolbar,
      customToolbarSelect:selectionBar,
      responsive: 'simple'
    };
  }

  getColumns(){
    return [
      {
        name: "Name",
        options: {filter: false, sort: true, searchable: true}
      },
      {
        name: "Price",
        options: {filter: false, sort: false, searchable: false}
      },{
        name: "Barcode",
        options: {filter: false, sort: true, searchable: true}
      },{
        name: "Category",
        options: {filter: true, sort: false, searchable: true}
      }];
  }

  generateData(items){
    return _.sortBy(items, (o) =>
        (lodash.isNaN(Number(o.barcode)) ? o.barcode : Number(o.barcode)))
      .map((item) => [item.name, item.sp, item.barcode, item.category || '']);
  }
}

export default new ItemsDataTableService();
