import React, { Component} from 'react';
import { withSnackbar } from 'notistack';

import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillDataTable from '../dataTable/billDataTable';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';
import itemsService from './../../services/itemsService';

class Bill extends Component {
  constructor(props){
    super(props);
    this.state = {masterList: []};
  }

  componentDidMount(){
    itemsService.list()
      .then((masterList) => this.setState({masterList}))
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
        });
  }

  render() {
    return (
      <BillDataTable
        service={new BillService(new ImmutableCart([]))}
        datatableService={billDataTableService}
        addForm={AddNewItem}
        masterList={this.state.masterList}
      />
    );
  }
}

export default withSnackbar(Bill);
