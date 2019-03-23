class ItemsDataTableService {

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
        name: "Name",
        options: {filter: false, sort: false}
      },
      {
        name: "Price",
        options: {filter: false, sort: false}
      },{
        name: "Barcode",
        options: {filter: false, sort: false}
      }];
  }

  generateData(items){
    return items.map((item) => [item.name, item.sp, item.barcode]);
  }
}

export default new ItemsDataTableService();
