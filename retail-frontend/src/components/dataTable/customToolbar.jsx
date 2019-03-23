import React from 'react';
import AddItemIcon from './actions/add/icon';

export default ({service, addForm, refreshItems}) =>
  <React.Fragment>
    <AddItemIcon refreshItems={refreshItems} service={service} addForm={addForm}/>
  </React.Fragment>
