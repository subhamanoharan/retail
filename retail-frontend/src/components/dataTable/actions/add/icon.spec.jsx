import React from 'react';
import { shallow } from 'enzyme';
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import AddItemIcon from './icon';
import AddItemForm from './form';

describe('<AddItemIcon/>', () => {
  let wrapper;
  let serviceMock;
  let refreshItemsMock;
  const AddForm = () => <p>AddForm</p>;

  beforeEach(() => {
    serviceMock = jest.fn();
    refreshItemsMock = jest.fn();
    wrapper = shallow(<AddItemIcon service={serviceMock} addForm={AddForm} refreshItems={refreshItemsMock}/>);
  });

  it('should show add icon by default', () => {
    expect(wrapper.exists(AddIcon)).toBe(true);
    expect(wrapper.state()).toEqual({showAddItem: false});
  });

  it('should show add form on clicking the icon', () => {
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.state()).toEqual({showAddItem: true});
    expect(wrapper.exists(AddItemForm)).toBe(true);
  });

  it('should pass appropriate props to AddItemForm', () => {
    wrapper.setState({showAddItem: true});
    const {onSuccess, hideForm, service, addForm} = wrapper.find(AddItemForm).props();
    expect(onSuccess).toBeDefined();
    expect(service).toEqual(serviceMock);
    expect(addForm).toEqual(AddForm);
  });

  it('should hide form and refresh on add success', () => {
    wrapper.setState({showAddItem: true});
    const {onSuccess} = wrapper.find(AddItemForm).props();

    onSuccess();

    expect(refreshItemsMock).toHaveBeenCalled();
    expect(wrapper.state()).toEqual({showAddItem: false});
  });

  it('should hide form', () => {
    wrapper.setState({showAddItem: true});
    const {hideForm} = wrapper.find(AddItemForm).props();

    hideForm();

    expect(wrapper.state()).toEqual({showAddItem: false});
    expect(wrapper.exists(AddItemForm)).toBe(false);
  });
});
