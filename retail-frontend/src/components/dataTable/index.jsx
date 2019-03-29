import React from 'react';
import MUIDataTable from 'mui-datatables';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';

export default class ItemsDataTable extends React.Component {
  render() {
    const {items, service, datatableService, addForm, editForm, fetchItems} = this.props;

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
      />
    return (
      <div onMouseDown={(e) => e.preventDefault() }>
        <MUIDataTable
          data={datatableService.generateData(items)}
          columns={datatableService.getColumns()}
          options={datatableService.generateOptions(selectionBar, addForm && toolBarToShow)}
        />
      </div>
    );
  }
}
