import React from 'react';
import { shallow } from 'enzyme';

import SummaryCard from './index';
import Typography from '@material-ui/core/Typography';

describe('SummaryCard', () => {
  it('should show total and number of items', () => {
    const serviceMock = {getTotal: jest.fn(() => 4.4564), getTotalNoOfItems: jest.fn(() => 1)};
    const wrapper = shallow(<SummaryCard service={serviceMock}/>);
    expect(wrapper.find(Typography).at(0).childAt(0).text()).toEqual('No.of items: 1');
    expect(wrapper.find(Typography).at(1).childAt(0).text()).toEqual('Total: Rs.4.46');
  })
})
