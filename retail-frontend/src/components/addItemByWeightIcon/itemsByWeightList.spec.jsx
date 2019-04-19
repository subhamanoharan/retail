import React from "react";
import {shallow} from 'enzyme';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsByWeightList from './itemsByWeightList';

describe('ItemsByWeightList', () => {
  let wrapper;
  let handleItemSelectMock;
  let parentMock;
  const items = [
    {name: 'i1', barcode: 'b1', sp: 1},
    {name: 'i2', barcode: 'b2', sp: 2}
  ];
  beforeEach(() => {
    parentMock = jest.fn();
    handleItemSelectMock = jest.fn().mockReturnValue(parentMock);
    wrapper = shallow(< ItemsByWeightList
      items={items}
      handleItemSelect={handleItemSelectMock}
      selectedItem={null}/>);
  });

  it('should render ListItems', () => {
    expect(wrapper.find(ListItem)).toHaveLength(2);
  });

  it('should render selected item', () => {
    wrapper.setProps({selectedItem: items[0]});

    const listItem1 = wrapper.find(ListItem).at(0);
    const listItem2 = wrapper.find(ListItem).at(1);

    expect(listItem1.find(ListItem).props().selected).toEqual(true);
    expect(listItem2.find(ListItem).props().selected).toEqual(false);
  });
  
  it('should call parent on item selected', () => {
    const listItem1 = wrapper.find(ListItem).at(0);
    const {onClick} = listItem1.find(ListItem).props();
    onClick();

    expect(parentMock).toHaveBeenCalled();
  })
});
