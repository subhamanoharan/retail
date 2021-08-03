import React from 'react';
import { withSnackbar } from 'notistack';
import { shallow } from 'enzyme';

import DataTable from '../dataTable';
import itemsServiceMock from '../../services/itemsService';
import categoriesServiceMock from '../../services/categoriesService';
import itemsDataTableService from '../../services/itemsDataTableService';
import ItemFormMock from './itemForm';
import AdminItems from './index';

jest.mock('notistack', () => ({withSnackbar: jest.fn((a) => a)}));
jest.mock('./itemForm');
jest.mock('./../../services/itemsService', () => ({list: jest.fn()}));
jest.mock('./../../services/categoriesService', () => ({list: jest.fn()}));

describe('<AdminItems/>', () => {
  let wrapper;
  const masterList = [{name: 'Rice', barcode: '12'}, {name: 'Oil', barcode: '1a'}];
  const DummyItemForm = () => <p>Hey</p>;
  const categories = [{name: 'Rice'}, {name: 'Oil'}];

  beforeEach(() => {
    ItemFormMock.mockReturnValue(DummyItemForm);
    itemsServiceMock.list.mockResolvedValue(masterList);
    categoriesServiceMock.list.mockResolvedValue(categories);
    wrapper = shallow(<AdminItems />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch masterList on mount', () => {
    wrapper.update();
    expect(itemsServiceMock.list).toHaveBeenCalled();
    expect(categoriesServiceMock.list).toHaveBeenCalled();
    expect(wrapper.state().items).toEqual(masterList);
    expect(wrapper.state().categories).toEqual(['Rice', 'Oil']);
  });

  it('should pass appropriate props to DataTable', () => {
    wrapper.update();

    const {items, service, datatableService, addForm, editForm, fetchItems} = wrapper.find(DataTable).props();

    expect(items).toEqual(masterList);
    expect(service).toEqual(itemsServiceMock);
    expect(datatableService).toEqual(itemsDataTableService);
    expect(editForm).toEqual(DummyItemForm);
    expect(addForm).toEqual(DummyItemForm);
    expect(fetchItems).toEqual(expect.anything());
    expect(ItemFormMock).toHaveBeenCalledWith(['Rice', 'Oil']);
  });
});
