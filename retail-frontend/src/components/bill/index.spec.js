import React, { Component} from 'react';
import { shallow } from 'enzyme';

import DataTable from '../dataTable';
import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';
import itemsServiceMock from './../../services/itemsService';
import BarCodeManager from '../barCodeManager';
import PrintButton from '../printButton';
import SummaryCard from '../summaryCard';
import {default as Bill, Bill as BillS} from './index';

jest.mock('notistack', () => ({withSnackbar: jest.fn((a) => a)}));
jest.mock('./../../services/itemsService', () => ({list: jest.fn()}));

describe('Bill', () => {
  let wrapper;
  const masterList = 'masterList';
  beforeEach(() => {
    itemsServiceMock.list.mockResolvedValue(masterList);
    wrapper = shallow(<Bill />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch masterList on mount', () => {
    wrapper.update();
    expect(itemsServiceMock.list).toHaveBeenCalled();
    expect(wrapper.state().masterList).toEqual('masterList');
  });

  it('should contain PrintButton, SummaryCard, DataTable and BarCodeManager', () => {
    expect(wrapper.exists(PrintButton)).toEqual(true)
    expect(wrapper.exists(SummaryCard)).toEqual(true)
    expect(wrapper.exists(BarCodeManager)).toEqual(true)
    expect(wrapper.exists(DataTable)).toEqual(true)
  });

  it('should pass appropriate props to SummaryCard', () => {
    expect(wrapper.find(SummaryCard).props()).toEqual({service: expect.any(BillService)})
  });

  it('should pass appropriate props to BarCodeManager', () => {
    expect(wrapper.find(BarCodeManager).props()).toEqual({
      onItemScanned: expect.anything(),
      masterList
    });
  });

  it('should add and refresh items', () => {
    const {onItemScanned} = wrapper.find(BarCodeManager).props();

    onItemScanned({barcode: 'barcode', sp: 1, name: 'name', id: 12}, 3);

    expect(wrapper.state().items).toEqual([
      {barcode: 'barcode', name: 'name', sp: 1, quantity: 3, id: 12}
    ]);
  });

  it('should pass appropriate props to DataTable', () => {
    const {items, service, datatableService, addForm, fetchItems} = wrapper.find(DataTable).props();

    expect(items).toEqual([]);
    expect(service).toEqual(expect.any(BillService));
    expect(datatableService).toEqual(billDataTableService);
    expect(addForm).toEqual(AddNewItem);
    expect(fetchItems).toEqual(expect.anything());
  });
});
