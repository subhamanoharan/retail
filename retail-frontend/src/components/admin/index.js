import React from 'react';
import { withSnackbar } from 'notistack';

import DataTable from '../dataTable';
import itemsService from '../../services/itemsService';
import categoriesService from '../../services/categoriesService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemForm from './itemForm';

class Items extends React.Component {
  constructor(props){
    super(props);
    this.state = {items: [], categories: []};
    this.fetchItems = this.fetchItems.bind(this);
  }

  componentDidMount(){
    this.fetchItems();
    this.fetchCategories();
  }

  fetchCategories(){
    return categoriesService.list()
      .then((categories) => this.setState({categories: categories.map(({name}) => name)}))
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
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
