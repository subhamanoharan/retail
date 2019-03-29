import React from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import itemsService from '../../services/itemsService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemForm from './itemForm';

class Items extends React.Component {
  constructor(props){
    super(props);
    this.state = {items: []};
    this.fetchItems = this.fetchItems.bind(this);
  }

  componentDidMount(){
    this.fetchItems();
  }

  fetchItems(){
    return itemsService.list()
      .then((items) => this.setState({items}))
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  render() {
    return (
      <DataTable
        items={this.state.items}
        service={itemsService}
        datatableService={itemsDataTableService}
        editForm={ItemForm}
        addForm={ItemForm}
        fetchItems={this.fetchItems}
      />);
  }
}

export default withSnackbar(Items);
