import React from 'react';
import {shallow} from 'enzyme';

import ListItem from '@material-ui/core/ListItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoriesList from './categoriesList';

describe('CategoriesList', () => {
  const categories = ['c1', 'c2'];
  let handleCategorySelectMock;
  let parentMock;
  const NestedListMock = () => <p>NestedList</p>;
  let props;

  beforeEach(() => {
    parentMock = jest.fn();
    handleCategorySelectMock = jest.fn().mockReturnValue(parentMock);
    props = {
      categories: categories,
      handleCategorySelect: handleCategorySelectMock,
      selectedCategoryIndex: null,
      nestedList: NestedListMock
    };
  });

  it('should render categories with none open', () => {
    const wrapper = shallow(<CategoriesList {...props}/>);

    expect(wrapper.find(ListItem)).toHaveLength(2);
    expect(wrapper.exists(ExpandMore)).toBe(false);
    expect(wrapper.exists(NestedListMock)).toBe(false);
  });

  it('should render categories with selected category open', () => {
    const wrapper = shallow(<CategoriesList {...props} selectedCategoryIndex={0}/>);
    const categoryWrapper1 = wrapper.find('div').at(0);
    const categoryWrapper2 = wrapper.find('div').at(1);

    expect(categoryWrapper1.exists(ExpandMore)).toBe(true);
    expect(categoryWrapper1.find(ListItem).props().selected).toEqual(true);
    expect(categoryWrapper1.find(NestedListMock).props()).toEqual({category: 'c1'});

    expect(categoryWrapper2.exists(ExpandMore)).toBe(false);
    expect(categoryWrapper2.find(ListItem).props().selected).toEqual(false);
    expect(categoryWrapper2.exists(NestedListMock)).toBe(false);
  });

  it('should call handleCategorySelectMock on click', () => {
    const wrapper = shallow(<CategoriesList {...props} />);
    const categoryWrapper1 = wrapper.find('div').at(0);
    const {onClick} = categoryWrapper1.find(ListItem).props()

    onClick();

    expect(parentMock).toHaveBeenCalled();
  });
});
