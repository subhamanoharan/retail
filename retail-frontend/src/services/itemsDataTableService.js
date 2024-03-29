class ItemsDataTableService {

  generateOptions(selectionBar, toolbar){
    return {
      filterType: 'checkbox', pagination: false,
      filter: true, viewColumns: false, print: true, download: true,
      search: true,
      customToolbar: toolbar,
      customToolbarSelect:selectionBar,
      responsive: 'simple',
      count: 30
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
      }, {
        name: "Tax Percent",
        options: {filter: true, sort: false, searchable: true}
      }];
  }

  generateData(items){
    return items
      .map((item) => [item.name, item.sp, item.barcode, item.category || '', item.tax_percent]);
  }
}

export default new ItemsDataTableService();
