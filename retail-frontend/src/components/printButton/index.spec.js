import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import { shallow } from 'enzyme';

import PrinterServiceMock from '../../services/printerService';
import PrintButton from './index';

jest.mock('notistack', () => ({withSnackbar: jest.fn((a) => a)}));
jest.mock('../../services/printerService');

describe('<PrintButton/>', () => {
  let wrapper;
  const lines = ['1', '2', '3']
  const generatePrintLinesMock = jest.fn().mockReturnValue(lines);
  const enqueueSnackbarMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<PrintButton generatePrintLines={generatePrintLinesMock}
        enqueueSnackbar={enqueueSnackbarMock}
      />);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Pair with printer button', () => {
    it('should initially show pair with printer button', () => {
      const props = wrapper.find(Button).props();
      expect(props.children).toEqual('Pair with Printer')
      expect(wrapper.state()).toEqual({isPaired: false})
    });

    it('should pair with printer on button click', async () => {
      PrinterServiceMock.pair.mockResolvedValue();
      PrinterServiceMock.isPaired.mockReturnValue(true);

      const {onClick} = wrapper.find(Button).props();
      await onClick();

      expect(PrinterServiceMock.pair).toHaveBeenCalled();
      expect(wrapper.state()).toEqual({isPaired: true});
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('Paired with printer!', {variant: 'success'});
    });

    it('should show error on pair with printer fail', async () => {
      PrinterServiceMock.pair.mockResolvedValue();
      PrinterServiceMock.isPaired.mockReturnValue(false);

      const {onClick} = wrapper.find(Button).props();
      await onClick();

      expect(PrinterServiceMock.pair).toHaveBeenCalled();
      expect(wrapper.state()).toEqual({isPaired: false});
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('Unable to pair with printer!', {variant: 'error'});
    });
  });

  describe('Print button', () => {
    it('should show print button when paired', () => {
      wrapper.setState({isPaired: true});
      const props = wrapper.find(Button).props();
      expect(props.children).toEqual('Print')
    });

    it('should print on button click', () => {
      wrapper.setState({isPaired: true});

      const {onClick} = wrapper.find(Button).props();
      onClick();

      expect(PrinterServiceMock.print).toHaveBeenCalledWith(lines);
    });
  });
});
