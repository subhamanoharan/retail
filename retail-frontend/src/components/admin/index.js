import React from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import itemsService from '../../services/itemsService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemForm from './itemForm';

class Items extends React.Component {
  constructor(props){
    super(props);
    this.state = {items: [], categories: ['Rice', 'Oil']};
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
    const {items, categories} = this.state;
    return (
      <DataTable
        items={items}
        service={itemsService}
        datatableService={itemsDataTableService}
        editForm={ItemForm(categories)}
        addForm={ItemForm(categories)}
        fetchItems={this.fetchItems}
      />);
  }
}

export default withSnackbar(Items);
