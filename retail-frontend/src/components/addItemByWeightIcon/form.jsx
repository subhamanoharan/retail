import React from "react";

import ItemsList from './itemsList';
import WeightInputForm from '../weightInputForm';

export default class AddItemByWeightForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {getWeight: false, selectedItem: null};
      this.onItemSelected = this.onItemSelected.bind(this);
      this.onWeightEntered = this.onWeightEntered.bind(this);
   }

  groupByCategories(){
    const {masterList} = this.props;
    return masterList
      .filter(({byWeight}) => byWeight)
      .reduce((acc, item) => {
        const existingCategoryItems = acc[item.category] || [];
        return {...acc, [item.category]: [...existingCategoryItems, item]}
      }, {});
  }

  onItemSelected(selectedItem){
    this.setState({getWeight: true, selectedItem});
  }

  onWeightEntered(weight, units){
    this.props.onSuccess(this.state.selectedItem, weight, units);
    this.props.hideForm();
  }

  render() {
    const {getWeight, selectedItem} = this.state;
    const {masterList, hideForm, onSuccess} = this.props;
    return(getWeight ?
      <WeightInputForm item={selectedItem} onSubmit={this.onWeightEntered} onCancel={hideForm}/> :
      <ItemsList
        items={this.groupByCategories()}
        onItemSelected={this.onItemSelected}
        hideForm={hideForm}
      />
    );
  }
}
