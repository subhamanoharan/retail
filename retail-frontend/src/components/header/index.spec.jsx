import React from 'react';
import { shallow } from 'enzyme';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';
import Header from './index';

describe('<Header/>', () => {
  let wrapper;
  const clearItemsMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Header clearItems={clearItemsMock}/>);
  });

  it('should have print and clear button', () => {
    expect(wrapper.exists(PrintButton)).toBe(true);
    expect(wrapper.exists(ClearButton)).toBe(true);
  });

  it('should pass appropriate props to clearButton', () => {
    expect(wrapper.find(ClearButton).props()).toEqual({clearItems: clearItemsMock});
  });
});
