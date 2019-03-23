import React from 'react';
import { shallow } from 'enzyme';

import EditActionForm from './form';

describe('<EditActionForm />', () => {
  let onSuccessMock, hideFormMock, EditForm;
  let wrapper;
  let serviceMock = {};
  const item = {id: 1, name: 'item'};

  beforeEach(() => {
    onSuccessMock = jest.fn();
    hideFormMock = jest.fn();
    EditForm = () => <p>Hey</p>;
    serviceMock = {edit: jest.fn()};
    wrapper = shallow(<EditActionForm
      item={item}
      onSuccess={onSuccessMock}
      hideForm={hideFormMock}
      editForm={EditForm}
      service={serviceMock}
    />)
  });

  it('should render edit form with props', () => {
    const {onSubmit, onSuccess, hideForm, item: itemProp} = wrapper.find(EditForm).props();
    expect(onSubmit).toBeDefined();
    expect(onSuccess).toEqual(onSuccessMock);
    expect(hideForm).toEqual(hideFormMock);
    expect(item).toEqual(itemProp);
  });

  it('should handle submits', () => {
    const {onSubmit} = wrapper.find(EditForm).props();

    onSubmit({name: 'item1'});

    expect(serviceMock.edit).toHaveBeenCalledWith(item.id, {...item, name: 'item1'});
  });
});
