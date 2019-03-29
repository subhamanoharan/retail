import React from 'react';

import MUIDataTable from 'mui-datatables';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';
import BarCodeManager from '../barCodeManager';
import PrintButton from '../printButton';
import SummaryCard from '../summaryCard';

export default class ItemsDataTable extends React.Component {
  constructor(props){
    super(props);
    this.state = { items: []}
    this.fetchItems = this.fetchItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  componentDidMount(){
    this.fetchItems();
  }

  fetchItems(){
    this.setState({items: this.props.service.list()})
  }

  onAddItem({barcode, sp, name, id}, quantity){
    this.props.service.add({barcode, sp, name, quantity, id});
    this.fetchItems();
  }

  render() {
    const {items} = this.state;
    const {service, datatableService, addForm, editForm, rowPropsGenerator} = this.props;

    const selectionBar = (selectedRows) =>
      <CustomSelectionToolbar
        selectedRows={selectedRows}
        items={items}
        refreshItems={this.fetchItems}
        service={service}
        editForm={editForm}
      />;
    const toolBarToShow = () =>
      <CustomToolbar
        refreshItems={this.fetchItems}
        service={service}
        addForm={addForm}
      />
    return (
      <div onMouseDown={(e) => e.preventDefault() }>
        <SummaryCard service={service}/>
        <BarCodeManager onItemScanned={this.onAddItem} masterList={this.props.masterList}/>
        <PrintButton/>
        <MUIDataTable
          data={datatableService.generateData(items)}
          columns={datatableService.getColumns()}
          options={datatableService.generateOptions(selectionBar, addForm && toolBarToShow, rowPropsGenerator)}
        />
      </div>
    );
  }
}
