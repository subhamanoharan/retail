import React, { Component} from 'react';
import { shallow } from 'enzyme';

import DataTable from '../dataTable';
import AddNewItem from './addManualItemForm';
import ImmutableCart from '../../models/immutableCart';
import BillService from '../../services/billService';
import billDataTableService from '../../services/billDataTableService';
import itemsServiceMock from './../../services/itemsService';
import BarCodeManager from '../barCodeManager';
import Header from '../header';
import SummaryCard from '../summaryCard';
import Bill from './index';
import AddItemByWeightAction from '../addItemByWeightIcon/icon';

jest.mock('notistack', () => ({withSnackbar: jest.fn((a) => a)}));
jest.mock('./../../services/itemsService', () => ({list: jest.fn()}));

describe('Bill', () => {
  let wrapper;
  const masterList = 'masterList';
  let enqueueSnackbarMock;

  beforeEach(() => {
    enqueueSnackbarMock = jest.fn();
    itemsServiceMock.list.mockResolvedValue(masterList);
    wrapper = shallow(<Bill enqueueSnackbar={enqueueSnackbarMock}/>);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch masterList on mount', () => {
    wrapper.update();
    expect(itemsServiceMock.list).toHaveBeenCalled();
    expect(wrapper.state().masterList).toEqual('masterList');
  });

  it('should contain Header, SummaryCard, DataTable and BarCodeManager', () => {
    expect(wrapper.exists(Header)).toEqual(true)
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
      onItemByWeightScanned: expect.anything(),
      masterList
    });
  });

  it('should pass appropriate props to Header', () => {
    wrapper.setState({items: ['i1']})
    const {clearItems, generatePrintLines} = wrapper.find(Header).props();

    expect(clearItems).toBeDefined();
    expect(generatePrintLines).toBeDefined();
  });

  it('should pass clearItems prop to Header', () => {
    wrapper.setState({items: ['i1']})
    const {clearItems} = wrapper.find(Header).props();

    clearItems();

    expect(wrapper.state().items).toEqual([]);
  });

  it('should pass generatePrintLines prop to Header', () => {
    const {onItemScanned} = wrapper.find(BarCodeManager).props();

    onItemScanned({barcode: 'barcode', sp: 1, name: 'name', id: 12}, 3);
    const {generatePrintLines} = wrapper.find(Header).props();

    expect(generatePrintLines()).toEqual([
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      '1 name                    3 3.00',
      expect.any(String),
      '                            3.00'
    ]);
  });

  it('should add and refresh items', () => {
    const {onItemScanned} = wrapper.find(BarCodeManager).props();

    onItemScanned({barcode: 'barcode', sp: 1, name: 'name', id: 12}, 3);

    expect(wrapper.state().items).toEqual([
      {barcode: 'barcode', name: 'name', sp: 1, quantity: 3, id: 12}
    ]);
    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Scanned name', {variant: 'success'});
  });

  it('should add item by weight and refresh items', () => {
    const {onItemByWeightScanned} = wrapper.find(BarCodeManager).props();

    onItemByWeightScanned({barcode: 'barcode', sp: 1, name: 'name', id: 12, byWeight: true}, 3.5, 12);

    expect(wrapper.state().items).toEqual([
      {barcode: 'barcode', name: 'name', sp: 1, quantity: 12, weight: 3.5, id: 12, byWeight: true}
    ]);
    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Scanned name', {variant: 'success'});
  });

  it('should pass appropriate props to DataTable', () => {
    const {items, service, datatableService, addForm, fetchItems, additionalActions} = wrapper.find(DataTable).props();

    expect(items).toEqual([]);
    expect(service).toEqual(expect.any(BillService));
    expect(datatableService).toEqual(billDataTableService);
    expect(addForm).toEqual(AddNewItem);
    expect(fetchItems).toEqual(expect.anything());
    expect(additionalActions).toHaveLength(1);
  });

  it('should pass appropriate props to AddItemByWeightAction', () => {
    const {additionalActions: [Action]} = wrapper.find(DataTable).props();
    const actionWrapper = shallow(<Action/>);

    const {onSuccess, masterList: masterListProp} = actionWrapper.find(AddItemByWeightAction).props();

    onSuccess({barcode: 'barcode', sp: 1, name: 'name', id: 12, byWeight: true}, 3.5, 12);

    expect(masterListProp).toEqual(masterList);
    expect(wrapper.state().items).toEqual([
      {barcode: 'barcode', name: 'name', sp: 1, quantity: 12, weight: 3.5, id: 12, byWeight: true}
    ]);
    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Scanned name', {variant: 'success'});
  });
});
