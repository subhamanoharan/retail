import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';

export default ({items, service, datatableService, addForm, editForm, fetchItems, additionalActions = []}) => {
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableToolbarSelect: {
        root: {
          position: 'sticky',
          top: '0'
        }
      }
    }
  });

  const selectionBar = (selectedRows, displayData, setSelectedRows) =>
    <CustomSelectionToolbar
      selectedRows={selectedRows}
      displayData={displayData}
      setSelectedRows={setSelectedRows}
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
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={datatableService.generateData(items)}
        columns={datatableService.getColumns()}
        options={datatableService.generateOptions(selectionBar, addForm && toolBarToShow)}
      />
    </MuiThemeProvider>
  );
}
