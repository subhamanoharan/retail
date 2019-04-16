import React, { Component} from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';
import itemsService from './../../services/itemsService';
import BarCodeManager from '../barCodeManager';
import Header from '../header';
import SummaryCard from '../summaryCard';

export class Bill extends Component {
  constructor(props){
    super(props);
    this.state = {masterList: [], items: []};
    this.service = new BillService(new ImmutableCart([]));
    this.fetchItems = this.fetchItems.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.generatePrintLines = this.generatePrintLines.bind(this);
  }

  componentDidMount(){
    return this.fetchMasterList();
  }

  fetchMasterList(){
    return itemsService.list()
      .then((masterList) => this.setState({masterList}))
      .catch((errors) => {
        if(errors)
          return errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  fetchItems(){
    this.setState({items: this.service.list()})
  }

  clearItems(){
    this.service.clear();
    this.fetchItems();
  }

  onAddItem({barcode, sp, name, id, byWeight}, quantity){
    this.service.add({barcode, sp, name, quantity, id, byWeight});
    this.fetchItems();
  }

  generatePrintLines(){
    return this.service.getLinesToPrint();
  }

  render() {
    return (
      <div>
        <Header clearItems={this.clearItems} generatePrintLines={this.generatePrintLines}/>
        <SummaryCard service={this.service}/>
        <BarCodeManager onItemScanned={this.onAddItem} masterList={this.state.masterList}/>
        <DataTable
          items={this.state.items}
          service={this.service}
          datatableService={billDataTableService}
          addForm={AddNewItem}
          fetchItems={this.fetchItems}
        />
      </div>
    );
  }
}

export default withSnackbar(Bill);
