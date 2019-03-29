import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import { shallow } from 'enzyme';
import DeleteIcon from "@material-ui/icons/Delete";
import P from 'bluebird';

import EditItemIcon from './actions/edit/icon';
import CustomSelectionToolbar from './customSelectionToolbar';

describe.skip('<CustomSelectionToolbar />', () => {
  let wrapper;
  let serviceMock;
  let refreshItemsMock;
  const selectedRows = {data: [{index: 1}, {index: 3}]}
  const items = ['item1', 'item2', 'item3', 'item4'];

  beforeEach(() => {
    serviceMock = {delete: jest.fn()};
    refreshItemsMock = jest.fn();
    wrapper = shallow(<CustomSelectionToolbar
        items={items}
        selectedRows={selectedRows}
        service={serviceMock}
        refreshItems={refreshItemsMock}
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
      serviceMock.delete.mockRejectedValue('error');

      await onClick();

      expect(serviceMock.delete).toHaveBeenCalledTimes(1);
      expect(serviceMock.delete).toHaveBeenCalledWith('item2');
      expect(refreshItemsMock).not.toHaveBeenCalled();
    });
  });
});
