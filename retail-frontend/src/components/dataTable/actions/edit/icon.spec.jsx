import React from 'react';
import { shallow } from 'enzyme';

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import EditItemIcon from './icon';
import EditItemForm from './form';

describe('<EditItemIcon/>', () => {
  let wrapper;
  let serviceMock;
  let refreshItemsMock;
  const EditForm = () => <p>EditForm</p>;

  beforeEach(() => {
    serviceMock = jest.fn();
    refreshItemsMock = jest.fn();
    wrapper = shallow(<EditItemIcon service={serviceMock} editForm={EditForm} refreshItems={refreshItemsMock}/>);
  });

  it('should show edit icon by default', () => {
    expect(wrapper.exists(EditIcon)).toBe(true);
    expect(wrapper.state()).toEqual({showEditItem: false});
  });

  it('should show edit form on clicking the icon', () => {
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.state()).toEqual({showEditItem: true});
    expect(wrapper.exists(EditItemForm)).toBe(true);
  });

  it('should pass appropriate props to EditItemForm', () => {
    wrapper.setState({showEditItem: true});
    const {onSuccess, hideForm, service, editForm} = wrapper.find(EditItemForm).props();
    expect(onSuccess).toBeDefined();
    expect(service).toEqual(serviceMock);
    expect(editForm).toEqual(EditForm);
  });

  it('should hide form and refresh on edit success', () => {
    wrapper.setState({showEditItem: true});
    const {onSuccess} = wrapper.find(EditItemForm).props();

    onSuccess();

    expect(refreshItemsMock).toHaveBeenCalled();
    expect(wrapper.state()).toEqual({showEditItem: false});
  });

  it('should hide form', () => {
    wrapper.setState({showEditItem: true});
    const {hideForm} = wrapper.find(EditItemForm).props();

    hideForm();

    expect(wrapper.state()).toEqual({showEditItem: false});
    expect(wrapper.exists(EditItemForm)).toBe(false);
  });
});
