import React from 'react';
import { shallow } from 'enzyme';
import Button from "@material-ui/core/Button";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { BarCodeInputField } from './index';

describe('<BarCodeInputField />', () => {
  let wrapper;
  let onScanCompleteMock;
  const searchableMasterList = ['1', '2']

  beforeEach(() => {
    onScanCompleteMock = jest.fn();
    wrapper = shallow(<BarCodeInputField
      onScanComplete={onScanCompleteMock}
      searchableMasterList={searchableMasterList}
      classes={{option: 'option'}}
    />);
  });

  it('renders Autocomplete and Button', () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.exists(Autocomplete)).toBe(true);
  });

  it('should render Autocomplete with options set', () => {
    const { options } = wrapper.find(Autocomplete).props();

    expect(wrapper.state()).toEqual({code: ''});
    expect(options).toEqual(searchableMasterList);
  });
  describe('should render Autocomplete with option label', () => {
    it('initial', () => {
      const { getOptionLabel } = wrapper.find(Autocomplete).props();
      expect(getOptionLabel()).toEqual('');
    });
    it('by weight item', () => {
      const { getOptionLabel } = wrapper.find(Autocomplete).props();
      expect(getOptionLabel({ byWeight: true, name: 'dhall', sp: 2})).toEqual('dhall - Rs.2/kg');
    });
    it('custom code item', () => {
      const { getOptionLabel } = wrapper.find(Autocomplete).props();
      expect(getOptionLabel({ name: 'dhall', sp: 2})).toEqual('dhall - Rs.2');
    });
  })

  it('should update state on code input', () => {
    const autoCompleteWrapper = wrapper.find(Autocomplete);
    const newCode = 'newCode';
    autoCompleteWrapper.simulate('change', {}, newCode)

    expect(wrapper.state()).toEqual({code: newCode});
  });

  it('should update state on autoComplete input', () => {
    const autoCompleteWrapper = wrapper.find(Autocomplete);
    const autoCompleteItem = { name: 'broom', barcode: '124'};
    autoCompleteWrapper.simulate('change', {}, autoCompleteItem)

    expect(wrapper.state()).toEqual({code: autoCompleteItem});
  });

  it('should call back parent on code submit', () => {
    const newCode = 'newCode';
    wrapper.setState({code: newCode});
    const formWrapper = wrapper.find('form');
    const submitEvent = {preventDefault: jest.fn()};

    formWrapper.simulate('submit', submitEvent)

    expect(wrapper.state()).toEqual({code: ''});
    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(onScanCompleteMock).toHaveBeenCalledWith(newCode);
  });

  it('should call back parent on autoComplete item submit', () => {
    const autoCompleteItem = { name: 'broom', barcode: '124'};
    wrapper.setState({code: autoCompleteItem});
    const formWrapper = wrapper.find('form');
    const submitEvent = {preventDefault: jest.fn()};

    formWrapper.simulate('submit', submitEvent)

    expect(wrapper.state()).toEqual({code: ''});
    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(onScanCompleteMock).toHaveBeenCalledWith(autoCompleteItem.barcode);
  });
});
