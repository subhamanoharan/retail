import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import { shallow } from 'enzyme';
import DeleteIcon from "@material-ui/icons/Delete";
import P from 'bluebird';

import EditItemIcon from './actions/edit/icon';
import CustomSelectionToolbar from './customSelectionToolbar';

describe('<CustomSelectionToolbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomSelectionToolbar />);
  });

  describe('Delete action', () => {
    it('should show delete icon by default', () => {
      expect(wrapper.exists(DeleteIcon)).toBe(true);
    });
  });
});
