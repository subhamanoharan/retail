import React, { Component} from 'react';
import {shallow} from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import QuantityEditor from './index';

describe('QuantityEditor', () => {
  let wrapper;
  const v = 1;
  const rowIndex = 2;
  let incrementQuantityMock, decrementQuantityMock, getQuantityMock;

  beforeEach(() => {
    incrementQuantityMock = jest.fn();
    decrementQuantityMock = jest.fn();
    getQuantityMock = jest.fn();
    wrapper = shallow(<QuantityEditor
      value={v}
      tableMeta={{rowIndex}}
      incrementQuantity={incrementQuantityMock}
      decrementQuantity={decrementQuantityMock}
      getQuantity={getQuantityMock}
    />)
  });

  it('should contain buttons and value', () => {
    expect(wrapper.find(Typography).at(0).childAt(0).text()).toEqual(`${v}`);
    expect(wrapper.find(Button)).toHaveLength(2)
  });

  it('should decrement on minus button click', () => {
    const {onClick, disabled} = wrapper.find(Button).at(0).props();
    onClick();
    expect(decrementQuantityMock).toHaveBeenCalledWith(rowIndex);
    expect(disabled).toBe(false);
  });

  it('should show minus button as disabled when quantity is 1', () => {
    getQuantityMock.mockReturnValue(1);
    wrapper.setProps({getQuantity: getQuantityMock});
    const {disabled} = wrapper.find(Button).at(0).props();
    expect(disabled).toBe(true);
  });

  it('should increment on add button click', () => {
    const {onClick} = wrapper.find(Button).at(1).props();
    onClick();
    expect(incrementQuantityMock).toHaveBeenCalledWith(rowIndex);
  });
});
