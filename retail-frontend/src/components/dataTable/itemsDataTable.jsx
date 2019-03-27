import React from 'react';

import MUIDataTable from 'mui-datatables';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';
import { withSnackbar } from 'notistack';

class ItemsDataTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {items: []};
    this.fetchItems = this.fetchItems.bind(this);
  }

  componentDidMount(){
    this.fetchItems();
  }

  fetchItems(){
    const {service} = this.props;
    return service.list()
      .then((items) => this.setState({items}))
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
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
      <MUIDataTable
        data={datatableService.generateData(items)}
        columns={datatableService.getColumns()}
        options={datatableService.generateOptions(selectionBar, addForm && toolBarToShow, rowPropsGenerator)}
      />
    );
  }
}
export default withSnackbar(ItemsDataTable);
