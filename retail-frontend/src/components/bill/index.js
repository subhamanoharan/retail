import React, { Component} from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';
import itemsService from './../../services/itemsService';
import BarCodeManager from '../barCodeManager';
import PrintButton from '../printButton';
import SummaryCard from '../summaryCard';

export class Bill extends Component {
  constructor(props){
    super(props);
    this.state = {masterList: [], items: []};
    this.service = new BillService(new ImmutableCart([]));
    this.fetchItems = this.fetchItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
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

  onAddItem({barcode, sp, name, id}, quantity){
    this.service.add({barcode, sp, name, quantity, id});
    this.fetchItems();
  }

  render() {
    return (
      <div>
        <PrintButton/>
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
