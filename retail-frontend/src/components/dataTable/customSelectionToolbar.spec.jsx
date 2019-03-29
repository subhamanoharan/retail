import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import { shallow } from 'enzyme';
import DeleteIcon from "@material-ui/icons/Delete";
import P from 'bluebird';
import notistackMock from 'notistack';

import EditItemIcon from './actions/edit/icon';
import {CustomDataTableSelectionToolbar as CustomSelectionToolbar,
  default as NotificationSelectionToolbar} from './customSelectionToolbar';

jest.mock('notistack', () => ({withSnackbar: jest.fn(() => () => <p>Mock</p>)}));

describe('<CustomSelectionToolbar />', () => {
  let wrapper;
  let serviceMock;
  let refreshItemsMock;
  let enqueueSnackbarMock;
  const selectedRows = {data: [{index: 1}, {index: 3}]}
  const items = ['item1', 'item2', 'item3', 'item4'];

  beforeEach(() => {
    serviceMock = {delete: jest.fn()};
    refreshItemsMock = jest.fn();
    enqueueSnackbarMock = jest.fn();
    wrapper = shallow(<CustomSelectionToolbar
        items={items}
        selectedRows={selectedRows}
        service={serviceMock}
        refreshItems={refreshItemsMock}
        enqueueSnackbar={enqueueSnackbarMock}
      />);
  });

  describe('Delete action', () => {
    it('should show delete icon by default', () => {
      expect(wrapper.exists(DeleteIcon)).toBe(true);
    });

    it('should delete selected rows and refresh items', async () =>{
      const {onClick} = wrapper.find(IconButton).props();

      await onClick();

      expect(serviceMock.delete).toHaveBeenCalledTimes(2);
      expect(serviceMock.delete).toHaveBeenCalledWith('item2');
      expect(serviceMock.delete).toHaveBeenCalledWith('item4');
      expect(refreshItemsMock).toHaveBeenCalled();
    });

    it('should not refresh items on error', async () =>{
      const {onClick} = wrapper.find(IconButton).props();
      serviceMock.delete.mockRejectedValue(['error']);

      await onClick();

      expect(serviceMock.delete).toHaveBeenCalledTimes(2);
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('error', {variant: 'error'});
      expect(refreshItemsMock).not.toHaveBeenCalled();
    });
  });

  describe('Edit action', () => {
    it('should show edit icon when one item is selected and edit form is passed', () => {
      wrapper.setProps({editForm: () => <p>Edit</p>, selectedRows: {data: [{index: 1}]}});
      expect(wrapper.exists(EditItemIcon)).toBe(true);
    });

    it('should pass appropriate props to edit icon', () => {
      const edit = () => <p>Edit</p>;
      wrapper.setProps({editForm: edit, selectedRows: {data: [{index: 1}]}});

      const {item, refreshItems, service, editForm} = wrapper.find(EditItemIcon).props();

      expect(item).toEqual('item2');
      expect(refreshItems).toEqual(refreshItemsMock);
      expect(service).toEqual(serviceMock);
      expect(editForm).toEqual(edit);
    });

    it('should not show edit icon when one item is selected but no edit form is passed', () => {
      wrapper.setProps({selectedRows: {data: [{index: 1}]}});
      expect(wrapper.exists(EditItemIcon)).toBe(false);
    });

    it('should not show edit icon when multiple items are selected', () => {
      expect(wrapper.exists(EditItemIcon)).toBe(false);
    });

  });

  it('should be able to enqueue Snackbar', () => {
    wrapper = shallow(<NotificationSelectionToolbar />);
    expect(notistackMock.withSnackbar).toHaveBeenCalled();
  });
});
