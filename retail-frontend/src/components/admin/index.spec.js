import React from 'react';
import { withSnackbar } from 'notistack';
import { shallow } from 'enzyme';

import DataTable from '../dataTable';
import itemsServiceMock from '../../services/itemsService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemForm from './itemForm';
import AdminItems from './index';

jest.mock('notistack', () => ({withSnackbar: jest.fn((a) => a)}));
jest.mock('./../../services/itemsService', () => ({list: jest.fn()}));

describe('<AdminItems/>', () => {
  let wrapper;
  const masterList = 'masterList';
  beforeEach(() => {
    itemsServiceMock.list.mockResolvedValue(masterList);
    wrapper = shallow(<AdminItems />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch masterList on mount', () => {
    wrapper.update();
    expect(itemsServiceMock.list).toHaveBeenCalled();
    expect(wrapper.state().items).toEqual('masterList');
  });

  it('should pass appropriate props to DataTable', () => {
    const {items, service, datatableService, addForm, editForm, fetchItems} = wrapper.find(DataTable).props();

    expect(items).toEqual(masterList);
    expect(service).toEqual(itemsServiceMock);
    expect(datatableService).toEqual(itemsDataTableService);
    expect(editForm).toEqual(ItemForm);
    expect(addForm).toEqual(ItemForm);
    expect(fetchItems).toEqual(expect.anything());
  });
});
