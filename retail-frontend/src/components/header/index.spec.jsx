import React from 'react';
import { shallow } from 'enzyme';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';
import Header from './index';

describe('<Header/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should have print and clear button', () => {
    expect(wrapper.exists(PrintButton)).toBe(true);
    expect(wrapper.exists(ClearButton)).toBe(true);
  });
});
