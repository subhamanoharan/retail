import React, { Component} from 'react';

import cartItemFactory from '../models/cartItemFactory';
import {prettyPrintPrice} from '../models/stringUtility';

export default class BillDataTableService {
  constructor(quantityComponent){
    this.quantityComponent = quantityComponent;
  }

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
        options: {filter: false, sort: false, customBodyRender: this.quantityComponent}
      },{
        name: "Total",
        options: {filter: false, sort: false}
      }];
  }

  generateData(items){
    return items
      .map(cartItemFactory)
      .map((item, i) => [i+1, item.name, item.sp, item.getNoOfUnitsToDisplay(), prettyPrintPrice(item.price())]);
  }
}
