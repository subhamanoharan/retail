import React from 'react';
import { shallow } from 'enzyme';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import BarCodeInputField from './index';

describe('<BarCodeInputField />', () => {
  let wrapper;
  let onScanCompleteMock;

  beforeEach(() => {
    onScanCompleteMock = jest.fn();
    wrapper = shallow(<BarCodeInputField onScanComplete={onScanCompleteMock} />);
  });

  it('renders TextField and Button', () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.exists(TextField)).toBe(true);
  });

  it('should render with inital code set', () => {
    const {value} = wrapper.find(TextField).props();

    expect(wrapper.state()).toEqual({code: ''});
    expect(value).toEqual('');
  });

  it('should update state on code input', () => {
    const textFieldWrapper = wrapper.find(TextField);
    const newCode = 'newCode';
    textFieldWrapper.simulate('change', {target: {value: newCode}})

    expect(wrapper.state()).toEqual({code: newCode});
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
});
