class ItemsDataTableService {

  generateOptions(selectionBar, toolbar){
    return {
      filterType: 'checkbox', pagination: false,
      filter: false, viewColumns: false, print: false, download: false,
      search: true,
      customToolbar: toolbar,
      customToolbarSelect:selectionBar
    };
  }

  getColumns(){
    return [
      {
        name: "Name",
        options: {filter: false, sort: false, searchable: true}
      },
      {
        name: "Price",
        options: {filter: false, sort: false, searchable: true}
      },{
        name: "Barcode",
        options: {filter: false, sort: false, searchable: true}
      }];
  }

  generateData(items){
    return items.map((item) => [item.name, item.sp, item.barcode]);
  }
}

export default new ItemsDataTableService();
