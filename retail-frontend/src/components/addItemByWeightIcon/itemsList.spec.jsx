import React from 'react';
import { shallow } from 'enzyme';

import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import CategoriesList from './categoriesList';
import ItemsByWeightList from './itemsByWeightList';
import ItemsList from './itemsList';

describe('ItemsList', () => {
  let wrapper;
  let onItemSelectedMock;
  let hideFormMock;
  const items = {
    Rice: [{name: "Ponni Basmati", barcode: "ponni", sp: 50, byWeight: true, category: "Rice"}],
    Masala: [{name: "Manjal", barcode: "manjal", sp: 5, byWeight: true, category: "Masala"},
    {name: "Chilli powder", barcode: "chilli", sp: 57, byWeight: true, category: "Masala"}],
  };

  beforeEach(() => {
    onItemSelectedMock=jest.fn();
    hideFormMock=jest.fn();
    wrapper = shallow(<ItemsList items={items} onItemSelected={onItemSelectedMock} hideForm={hideFormMock}/>);
  });

  it('should set initial state', () =>
    expect(wrapper.state()).toEqual({selectedItem: null, selectedCategoryIndex: null, error: null})
  );

  it('should categories list by default', () => {
    expect(wrapper.exists(CategoriesList)).toBe(true);
    expect(wrapper.exists(ItemsByWeightList)).toBe(false);
  });

  describe('CategoriesList', () => {
    it('should pass appropriate props', () => {
      const props = wrapper.find(CategoriesList).props();

      expect(props).toEqual({
        categories: ['Rice', 'Masala'],
        handleCategorySelect: expect.anything(),
        selectedCategoryIndex: null,
        nestedList: expect.anything()
      });
    });

    it('should select category', () => {
      const {handleCategorySelect} = wrapper.find(CategoriesList).props();
      const event = {stopPropagation: jest.fn()};

      handleCategorySelect(0)(event);

      expect(wrapper.state()).toEqual({selectedCategoryIndex: 0, selectedItem: null, error: null})
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(wrapper.find(CategoriesList).props().selectedCategoryIndex).toEqual(0);
    });
  });

  describe('ItemsByWeightList', () => {
    let itemsListWrapper;

    beforeEach(() => {
      const {nestedList: NestedList} = wrapper.find(CategoriesList).props();
      itemsListWrapper = shallow(<NestedList category="Masala"/>);
    });

    it('should list items of selected category', () => {
      expect(itemsListWrapper.exists(ItemsByWeightList)).toBe(true)
    });

    it('should pass appropriate props', () => {
      const props = itemsListWrapper.find(ItemsByWeightList).props();
      expect(props).toEqual({
        handleItemSelect: expect.anything(),
        items: items['Masala'],
        selectedItem: null
      });
    });

    it('should select item', () => {
      const {handleItemSelect} = itemsListWrapper.find(ItemsByWeightList).props();
      const event = {stopPropagation: jest.fn()};

      handleItemSelect('item')(event);

      expect(wrapper.state()).toEqual({selectedCategoryIndex: null, selectedItem: 'item', error: null})
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  it('should call parent on form submit', () => {
    const event = {preventDefault: jest.fn()};
    const selectedItem = 'selectedItem';
    wrapper.setState({selectedItem})
    wrapper.find('form').simulate('submit', event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onItemSelectedMock).toHaveBeenCalledWith(selectedItem);
  });

  it('should show error on form submit with no selected item', () => {
    const event = {preventDefault: jest.fn()};
    wrapper.find('form').simulate('submit', event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onItemSelectedMock).not.toHaveBeenCalled();
    expect(wrapper.state().error).toEqual(true)
    expect(wrapper.find(Typography).props().color).toEqual('error');
  });

  it('should hide form on dialog close', () => {
    const event = {stopPropagation: jest.fn()};
    wrapper.find(Dialog).simulate('close', event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(hideFormMock).toHaveBeenCalled();
  });
});
