import React from "react";
import { shallow } from 'enzyme';

import IconButton from "@material-ui/core/IconButton";
import AddItemByWeightIcon from "@material-ui/icons/LocalGroceryStore";
import AddItemByWeightForm from "./form";
import AddItemByWeightAction from './icon';

describe('AddItemByWeightAction', () => {
  let wrapper;
  const masterList = 'masterList';
  let onSuccessMock;

  beforeEach(() => {
    onSuccessMock = jest.fn();
    wrapper = shallow(<AddItemByWeightAction masterList={masterList} onSuccess={onSuccessMock}/>)
  });

  it('should show icon by default', () => {
    expect(wrapper.exists(AddItemByWeightIcon)).toBe(true);
    expect(wrapper.exists(AddItemByWeightForm)).toBe(false);
    expect(wrapper.state()).toEqual({showForm: false});
  });

  it('should show form on icon click', () => {
    wrapper.find(IconButton).simulate('click');

    expect(wrapper.exists(AddItemByWeightForm)).toBe(true);
    expect(wrapper.state()).toEqual({showForm: true});
  });

  it('should pass appropriate props to AddItemByWeightForm', () => {
    wrapper.setState({showForm: true})
    const props = wrapper.find(AddItemByWeightForm).props();

    expect(props).toEqual({masterList, onSuccess: expect.anything(), hideForm: expect.anything()});
  });

  it('should hide form', () => {
    wrapper.setState({showForm: true})
    const {hideForm} = wrapper.find(AddItemByWeightForm).props();
    hideForm();
    expect(wrapper.exists(AddItemByWeightForm)).toBe(false);
  });

  it('should call parent on form submit', () => {
    wrapper.setState({showForm: true})
    const {onSuccess} = wrapper.find(AddItemByWeightForm).props();
    const item = {name: 'item1'}, weight = 12.4, units = 1;

    onSuccess(item, weight, units);

    expect(onSuccessMock).toHaveBeenCalledWith(item, weight, units);
    expect(wrapper.exists(AddItemByWeightForm)).toBe(false);
  });
});
