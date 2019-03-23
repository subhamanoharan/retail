import React from 'react';
import ItemsDataTable from '../dataTable/itemsDataTable';
import itemsService from '../../services/itemsService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemForm from './itemForm';

export default class Items extends React.Component {
  render() {
    return (
      <ItemsDataTable
        service={itemsService}
        datatableService={itemsDataTableService}
        editForm={ItemForm}
        addForm={ItemForm}
      />);
  }
}
