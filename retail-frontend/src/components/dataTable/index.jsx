import React from 'react';
import MUIDataTable from 'mui-datatables';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';

export default ({items, service, datatableService, addForm, editForm, fetchItems, additionalActions = []}) => {
  const selectionBar = (selectedRows) =>
    <CustomSelectionToolbar
      selectedRows={selectedRows}
      items={items}
      refreshItems={fetchItems}
      service={service}
      editForm={editForm}
    />;
  const toolBarToShow = () =>
    <CustomToolbar
      refreshItems={fetchItems}
      service={service}
      addForm={addForm}
      additionalActions={additionalActions}
    />
  return (
    <MUIDataTable
      data={datatableService.generateData(items)}
      columns={datatableService.getColumns()}
      options={datatableService.generateOptions(selectionBar, addForm && toolBarToShow)}
    />
  );
}
