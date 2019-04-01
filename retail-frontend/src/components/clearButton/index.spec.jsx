import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

import ClearButton from './index';

describe('<ClearButton/>', () => {
  let wrapper;
  const clearItemsMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ClearButton clearItems={clearItemsMock}/>);
  });

  it('should pass appropriate props to clearButton', () => {
    wrapper.find(Button).simulate('click');

    expect(clearItemsMock).toHaveBeenCalled();
  });
});
