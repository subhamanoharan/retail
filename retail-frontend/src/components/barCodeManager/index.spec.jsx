import React from 'react';
import { shallow } from 'enzyme';

import BarCodeInputField from '../barCodeInputField';
import BarCodeManager from './index';


describe('<BarCodeManager />', () => {
  let wrapper;
  let onItemScannedMock;
  const dummyMasterList = [{barcode: '1', name: 'item1'},
    {barcode: '1', name: 'item2'}, {barcode: '1', name: 'item3'}]

    const m = jest.fn();
    Object.defineProperty(window, 'alert', m);

  beforeEach(() => {
    onItemScannedMock = jest.fn();
    wrapper = shallow(<BarCodeManager masterList={dummyMasterList} onItemScanned={onItemScannedMock}/>);
  });

  it('renders barCodeInputField', () => {
    const barCodeInputFieldWrapper = wrapper.find(BarCodeInputField);
    expect(barCodeInputFieldWrapper.props()).toEqual({onScanComplete: expect.any(Function)});
  });

  it('should check code against masterlist', () => {
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
