import React from 'react';
import { shallow } from 'enzyme';

import AddItemIcon from './actions/add/icon';
import CustomToolbar from './customToolbar';

describe('<CustomToolbar />', () => {
  it('should render AddItemIcon', () =>{
    const props = {service: jest.fn(), addForm: () => <p>AddForm</p>, refreshItems: jest.fn()};
    const wrapper = shallow(<CustomToolbar {...props}/>);

    const addItemIconProps = wrapper.find(AddItemIcon).props();
    expect(addItemIconProps).toEqual(props);
  });
});
