import React from 'react';
import MUIDataTable from 'mui-datatables';
import { shallow } from 'enzyme';

import CustomSelectionToolbar from './customSelectionToolbar';
import CustomToolbar from './customToolbar';
import DataTable from './index';

describe('DataTable', () => {
  let wrapper;
  let datatableServiceMock;
  const fetchItemsMock = jest.fn();
  const items = ['i1', 'i2'];
  const serviceMock = jest.fn();
  const editForm = () => <p>Edit</p>;
  const addForm = () => <p>Add</p>;

  beforeEach(() => {
    datatableServiceMock = {generateData: jest.fn(() => 'data'), getColumns: jest.fn(() => 'columns'),
      generateOptions: jest.fn(() => 'options')};
    wrapper = shallow(<DataTable
      items={items}
      fetchItems={fetchItemsMock}
      datatableService={datatableServiceMock}
      service={serviceMock}
      editForm={editForm}
      addForm={addForm}
    />)
  });

  it('should pass appropriate props to MUIDataTable', () => {
    const {data, columns, options} = wrapper.find(MUIDataTable).props();

    expect(data).toEqual('data');
    expect(columns).toEqual('columns');
    expect(options).toEqual('options');
    expect(datatableServiceMock.generateData).toHaveBeenCalledWith(items);
  });

  it('should pass appropriate props to CustomSelectionToolbar', () => {
    const SelectionBar = datatableServiceMock.generateOptions.mock.calls[0][0];
    const selectionBarWrapper = shallow(<SelectionBar />);

    const {selectedRows, items, refreshItems, service, editForm} =
      selectionBarWrapper.find(CustomSelectionToolbar).props();

    expect(items).toEqual(items);
    expect(refreshItems).toEqual(fetchItemsMock);
    expect(service).toEqual(serviceMock);
    expect(editForm).toEqual(editForm);
  });

  it('should pass appropriate props to CustomToolbar', () => {
    const ToolBar = datatableServiceMock.generateOptions.mock.calls[0][1];
    const toolBarWrapper = shallow(<ToolBar />);

    const {refreshItems, service, addForm} = toolBarWrapper.find(CustomToolbar).props();

    expect(refreshItems).toEqual(fetchItemsMock);
    expect(service).toEqual(serviceMock);
    expect(addForm).toEqual(addForm);
  });
});
