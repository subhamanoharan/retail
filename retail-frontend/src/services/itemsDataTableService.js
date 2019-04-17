class ItemsDataTableService {

  generateOptions(selectionBar, toolbar){
    return {
      filterType: 'checkbox', pagination: false,
      filter: true, viewColumns: false, print: true, download: true,
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
      },{
        name: "Category",
        options: {filter: true, sort: false, searchable: true}
      }];
  }

  generateData(items){
    return items.map((item) => [item.name, item.sp, item.barcode, item.category || '']);
  }
}

export default new ItemsDataTableService();
