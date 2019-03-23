import React from 'react';
import { shallow } from 'enzyme';

import AddActionForm from './form';

describe('<AddActionForm />', () => {
  let onSuccessMock, hideFormMock, AddForm;
  let wrapper;
  let serviceMock = {};

  beforeEach(() => {
    onSuccessMock = jest.fn();
    hideFormMock = jest.fn();
    AddForm = () => <p>Hey</p>;
    serviceMock = {add: jest.fn()};
    wrapper = shallow(<AddActionForm
      onSuccess={onSuccessMock}
      hideForm={hideFormMock}
      addForm={AddForm}
      service={serviceMock}
    />)
  });

  it('should render add form with props', () => {
    const {onSubmit, onSuccess, hideForm} = wrapper.find(AddForm).props();
    expect(onSubmit).toBeDefined();
    expect(onSuccess).toEqual(onSuccessMock);
    expect(hideForm).toEqual(hideFormMock);
  });

  it('should handle submits', () => {
    const {onSubmit} = wrapper.find(AddForm).props();

    onSubmit('item');

    expect(serviceMock.add).toHaveBeenCalledWith('item');
  });
});
