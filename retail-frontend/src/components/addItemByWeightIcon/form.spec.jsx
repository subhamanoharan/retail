import React from "react";
import { shallow } from 'enzyme';

import ItemsList from './itemsList';
import WeightInputForm from '../weightInputForm';
import AddItemByWeightForm from './form'

describe('AddItemByWeightForm', () => {
  let wrapper;
  let hideFormMock;
  let onSuccessMock;
  const masterList = [{name: 'Colgate', barcode: 'colgate', sp: 12.55},
      {name: "Ponni Basmati", barcode: "ponni", sp: 50, byWeight: true, category: "Rice"},
      {name: "Manjal", barcode: "manjal", sp: 5, byWeight: true, category: "Masala"},
      {name: "Chilli powder", barcode: "chilli", sp: 57, byWeight: true, category: "Masala"}];

  beforeEach(() => {
    hideFormMock = jest.fn();
    onSuccessMock = jest.fn();
    wrapper = shallow(<AddItemByWeightForm masterList={masterList} hideForm={hideFormMock} onSuccess={onSuccessMock}/>);
  });

  it('should show list by default', () => {
    expect(wrapper.exists(ItemsList)).toBe(true);
    expect(wrapper.exists(WeightInputForm)).toBe(false);
    expect(wrapper.state()).toEqual({getWeight: false, selectedItem: null});
  });

  describe('ItemsList', () => {
    it('should pass appropriate props', () => {
      const props = wrapper.find(ItemsList).props();
      const expectedGroupedItems = {
        Masala: [masterList[2], masterList[3]],
        Rice: [masterList[1]]
      };
      expect(props).toEqual({
        items: expectedGroupedItems,
        onItemSelected: expect.anything(),
        hideForm: hideFormMock
      });
    });

    it('should show WeightInputForm on item selected', () => {
      const {onItemSelected} = wrapper.find(ItemsList).props();

      onItemSelected(masterList[2]);

      expect(wrapper.state()).toEqual({getWeight: true, selectedItem: masterList[2]});
      expect(wrapper.exists(WeightInputForm)).toBe(true);
    });
  });

  describe('WeightInputForm', () => {
    it('should pass appropriate props', () => {
      wrapper.setState({getWeight: true, selectedItem: masterList[3]})
      const props = wrapper.find(WeightInputForm).props();

      expect(props).toEqual({
        item: masterList[3],
        onSubmit: expect.anything(),
        onCancel: hideFormMock
      });
    });

    it('should call parent on weight input', () => {
      wrapper.setState({getWeight: true, selectedItem: masterList[3]})
      const {onSubmit} = wrapper.find(WeightInputForm).props();
      const weight=20.23, units=2;
      onSubmit(weight, units);

      expect(onSuccessMock).toHaveBeenCalledWith(masterList[3], weight, units);
      expect(hideFormMock).toHaveBeenCalled();
    });
  });
});
