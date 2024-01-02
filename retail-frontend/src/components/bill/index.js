import React, { Component} from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillMemoryManager from '../../services/billMemoryManager';
import BillService from '../../services/billService';
import BillDataTableService from '../../services/billDataTableService';
import itemsService from './../../services/itemsService';
import BarCodeManager from '../barCodeManager';
import Header from '../header';
import SummaryCard from '../summaryCard';
import AddItemByWeightAction from '../addItemByWeightIcon/icon';
import QuantityEditor from '../quantityEditor';

export class Bill extends Component {
  constructor(props){
    super(props);
    this.state = {masterList: [], items: []};
    this.service = new BillService(new ImmutableCart([]));
    this.billMemoryManager = new BillMemoryManager();

    this.fetchItems = this.fetchItems.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onItemByWeightScanned = this.onItemByWeightScanned.bind(this);
    this.generatePrintLines = this.generatePrintLines.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.getQuantity = this.getQuantity.bind(this);
    this.onLoadOldBill = this.onLoadOldBill.bind(this);
    this.billDataTableService = new BillDataTableService((value, tableMeta) =>
      <QuantityEditor
        value={value}
        tableMeta={tableMeta}
        incrementQuantity={this.incrementQuantity}
        decrementQuantity={this.decrementQuantity}
        getQuantity={this.getQuantity}
      />);
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
    console.log('CLEARING ITEMS')
    this.billMemoryManager.add(new ImmutableCart(this.service.list()))
    this.service.clear();
    this.fetchItems();
  }

  showSuccessMsgOnScanSuccess(name){
    this.props.enqueueSnackbar(`Scanned ${name}`, {variant: 'success'});
  }

  onAddItem({barcode, sp, name, id, tax_percent}, quantity){
    this.service.add({barcode, sp, name, quantity, id, tax_percent});
    this.fetchItems();
    this.showSuccessMsgOnScanSuccess(name);
  }

  onItemByWeightScanned({barcode, sp, name, id, byWeight, tax_percent}, weight, units){
    this.service.add({barcode, sp, name, id, byWeight, weight, tax_percent, quantity: units});
    this.fetchItems();
    this.showSuccessMsgOnScanSuccess(name);
  }

  generatePrintLines(){
    return this.service.getLinesToPrint();
  }

  onLoadOldBill(bill) {
    if(this.service.getTotal() > 0)
      this.billMemoryManager.add(this.service.cart)
    this.billMemoryManager.remove(bill)
    this.service.resetCartItems(bill.cart)
    this.setState({items: this.service.list()})
  }

  incrementQuantity(index){
    this.service.incrementQuantity(index)
    this.fetchItems();
  }

  decrementQuantity(index){
    this.service.decrementQuantity(index)
    this.fetchItems();
  }

  getQuantity(index){
    return this.service.getQuantity(index)
  }

  render() {
    const {masterList, items} = this.state;
    return (
      <div>
        <Header
          clearItems={this.clearItems}
          generatePrintLines={this.generatePrintLines}
          onLoadOldBill={this.onLoadOldBill}
          billHistory={this.billMemoryManager.getBills()}
        />
        <SummaryCard service={this.service}/>
        <BarCodeManager onItemScanned={this.onAddItem} onItemByWeightScanned={this.onItemByWeightScanned} masterList={this.state.masterList}/>
        <DataTable
          items={items}
          service={this.service}
          datatableService={this.billDataTableService}
          addForm={AddNewItem}
          fetchItems={this.fetchItems}
          additionalActions={[
            () => <AddItemByWeightAction masterList={masterList} onSuccess={this.onItemByWeightScanned}/>
          ]}
        />
      </div>
    );
  }
}

export default withSnackbar(Bill);
