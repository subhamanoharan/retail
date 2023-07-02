import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import { shallow } from 'enzyme';

import PrinterServiceMock from '../../services/printerService';
import PrintButton from './index';
import SelectPrinterInputForm from '../selectPrinterInputForm';
import lineGeneratorService from '../../services/printing/lineGenerator';

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
      expect(wrapper.state()).toEqual({isPaired: false, showSelectPrinterForm: false})
    });

    it('should show printer form on Pair button click', async () => {
      PrinterServiceMock.pair.mockResolvedValue();

      const {onClick} = wrapper.find(Button).props();
      await onClick();

      expect(PrinterServiceMock.pair).not.toHaveBeenCalled();
      expect(wrapper.state()).toEqual({isPaired: false, showSelectPrinterForm: true});
      expect(wrapper.exists(SelectPrinterInputForm)).toBe(true);
    });

    it('should pair with printer on submit click in SelectPrinterInputForm', async () => {
      PrinterServiceMock.pair.mockResolvedValue(Promise.resolve());
      PrinterServiceMock.isPaired.mockReturnValue(true);

      wrapper.setState({ showSelectPrinterForm: true, isPaired: false });
      const {onSubmit} = wrapper.find(SelectPrinterInputForm).props();
      await onSubmit(10);

      expect(lineGeneratorService.MAX_LIMIT).toEqual(10);
      expect(PrinterServiceMock.pair).toHaveBeenCalled();
      expect(PrinterServiceMock.isPaired).toHaveBeenCalled();
      expect(wrapper.state()).toEqual({isPaired: true,
        showSelectPrinterForm: false});
    });

    it('should show error on pair with printer fail', async () => {
      PrinterServiceMock.pair.mockResolvedValue();
      PrinterServiceMock.isPaired.mockReturnValue(false);

      wrapper.setState({ showSelectPrinterForm: true, isPaired: false });
      const {onSubmit} = wrapper.find(SelectPrinterInputForm).props();
      await onSubmit(10);

      expect(PrinterServiceMock.pair).toHaveBeenCalled();
      expect(wrapper.state()).toEqual({isPaired: false, showSelectPrinterForm: false});
      expect(enqueueSnackbarMock).toHaveBeenCalledWith('Unable to pair with printer!', {variant: 'error'});
    });
  });

  describe('Print button', () => {
    it('should show print button when paired', () => {
      wrapper.setState({isPaired: true});
      const props = wrapper.find(Button).at(0).props();
      expect(props.children).toEqual('Print')
    });

    it('should print on button click', () => {
      wrapper.setState({isPaired: true});

      const {onClick} = wrapper.find(Button).at(0).props();
      onClick();

      expect(PrinterServiceMock.print).toHaveBeenCalledWith(lines);
    });
  });

  describe('Switch printer button', () => {
    it('should show switch printer when paired', () => {
      wrapper.setState({isPaired: true});
      const props = wrapper.find(Button).at(1).props();
      expect(props.children).toEqual('Switch printer')
    });

    it('should switch on button click', async () => {
      PrinterServiceMock.unpair.mockResolvedValue();

      wrapper.setState({isPaired: true});
      const {onClick} = wrapper.find(Button).at(1).props();
      await onClick();

      expect(wrapper.state()).toEqual({isPaired: true, showSelectPrinterForm: true});
      expect(PrinterServiceMock.unpair).toHaveBeenCalled();
    });
  });
});
