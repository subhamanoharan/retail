import React from 'react';
import { shallow } from 'enzyme';

import BarCodeInputField from '../barCodeInputField';
import WeightInputForm from '../weightInputForm';
import BarCodeManager from './index';

describe('<BarCodeManager />', () => {
  let wrapper;
  let onItemScannedMock;
  let onItemByWeightScannedMock;
  const itemByWeight = {barcode: 'AC', name: 'item4', byWeight: true};
  const standardCodeItem = {barcode: '4902430899413', name: 'sunrise' };
  const dummyMasterList = [{barcode: '1', name: 'item1'},
    {barcode: '2', name: 'item2'},
    {barcode: 'AB', name: 'item3'},
    standardCodeItem,
    itemByWeight
  ];

  const m = jest.fn();
  Object.defineProperty(window, 'alert', m);

  beforeEach(() => {
    onItemScannedMock = jest.fn();
    onItemByWeightScannedMock = jest.fn();
    wrapper = shallow(
    <BarCodeManager
      masterList={dummyMasterList}
      onItemScanned={onItemScannedMock}
      onItemByWeightScanned={onItemByWeightScannedMock}
    />);
  });

  it('renders barCodeInputField by default', () => {
    const barCodeInputFieldWrapper = wrapper.find(BarCodeInputField);
    expect(barCodeInputFieldWrapper.props()).toEqual({
      onScanComplete: expect.any(Function),
      searchableMasterList: [
        {barcode: '1', name: 'item1'},
        {barcode: '2', name: 'item2'},
        {barcode: 'AB', name: 'item3'},
        itemByWeight
      ]
    });
  });

  it('renders WeightInputForm when item by weight is scanned', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete(itemByWeight.barcode);

    const barCodeInputFieldWrapper = wrapper.find(WeightInputForm);
    expect(wrapper.state()).toEqual({getWeight: true, matchingItem: itemByWeight})
    expect(barCodeInputFieldWrapper.props()).toEqual({
      onSubmit: expect.any(Function),
      onCancel: expect.any(Function),
      item: itemByWeight
    });
  });

  it('should pass weight and units on submit of weight form', () => {
    wrapper.setState({getWeight: true, matchingItem: itemByWeight});
    const {onSubmit} = wrapper.find(WeightInputForm).props();
    const weight = 10.5, units =12;

    onSubmit(weight, units);

    expect(onItemByWeightScannedMock).toHaveBeenCalledWith(itemByWeight, weight, units);
    expect(wrapper.state()).toEqual({getWeight: false, matchingItem: null})
  });

  it('should reset on cancel of weight form', () => {
    wrapper.setState({getWeight: true, matchingItem: itemByWeight});
    const {onCancel} = wrapper.find(WeightInputForm).props();

    onCancel();

    expect(onItemByWeightScannedMock).not.toHaveBeenCalled();
    expect(wrapper.state()).toEqual({getWeight: false, matchingItem: null})
  });

  it('should check code against masterlist for non-weight item', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete('1');

    expect(onItemScannedMock).toHaveBeenCalledWith({barcode: '1', name: 'item1'})
  });

  it('should check code against masterlist for weight item', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete(itemByWeight.barcode);

    expect(wrapper.state()).toEqual({getWeight: true, matchingItem: itemByWeight})
  });

  it('should check code against masterlist being case insensititve', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete('ab');

    expect(onItemScannedMock).toHaveBeenCalledWith(dummyMasterList[2])
  });

  it('should check name when barcode not match against masterlist for weight item', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete(itemByWeight.name);

    expect(wrapper.state()).toEqual({getWeight: true, matchingItem: itemByWeight})
  });

  it('should check name when barcode not match against masterlist for non-weight item', () => {
    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete('1');

    expect(onItemScannedMock).toHaveBeenCalledWith({barcode: '1', name: 'item1'})
  });

  it.skip('should alert if code is not in masterList', () => {

    const {onScanComplete} = wrapper.find(BarCodeInputField).props();

    onScanComplete('blah');

    expect(onItemScannedMock).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
