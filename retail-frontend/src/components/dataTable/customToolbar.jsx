import React from 'react';
import AddItemIcon from './actions/add/icon';

export default ({service, addForm, refreshItems, additionalActions=[]}) =>
  <React.Fragment>
    <AddItemIcon refreshItems={refreshItems} service={service} addForm={addForm}/>
    {additionalActions.map((A,i) => (<A key={i}/>))}
  </React.Fragment>
