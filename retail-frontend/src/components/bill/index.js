import React, { Component} from 'react';

import AddNewItem from './AddManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillDataTable from '../dataTable/billDataTable';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';

export default class Bill extends Component {
  render() {
    return (
        <BillDataTable
          service={new BillService(new ImmutableCart([]))}
          datatableService={billDataTableService}
          addForm={AddNewItem}
          masterList={this.props.masterList}
        />
    );
  }
}
