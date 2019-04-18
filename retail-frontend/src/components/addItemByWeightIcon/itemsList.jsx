import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import CategoriesList from './categoriesList';
import ItemsByWeightList from './itemsByWeightList';

export default class ItemsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedItem: null, selectedCategoryIndex: null, error: null};
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateItemsForCategory = this.generateItemsForCategory.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleCategorySelect(categoryIndex) {
    return (event) => {
      this.setState({selectedCategoryIndex: categoryIndex, selectedItem: null});
      event.stopPropagation();
    };
  }

  handleItemSelect(item) {
    return (event) => {
      this.setState({selectedItem: item});
      event.stopPropagation();
    };
  }

  handleSubmit(event){
    event.preventDefault();
    const {selectedItem} = this.state;
    if(selectedItem)
      this.props.onItemSelected(selectedItem);
    else
      this.setState({error: true});
  }

  hideModal(event){
    this.props.hideForm();
    event.stopPropagation();
  }

  generateItemsForCategory(category){
    const {items} = this.props;
    const {selectedItem} = this.state;
    return (
      <ItemsByWeightList
        items={items[category]}
        handleItemSelect={this.handleItemSelect}
        selectedItem={selectedItem}
      />
    );
  }

  render() {
    const {items} = this.props;
    const {error} = this.state;
    const categories = Object.keys(items);

    return (
      <Dialog
        open
        onClose={this.hideModal}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
      <DialogTitle id="form-dialog-title">Select Item</DialogTitle>
      <form onSubmit={this.handleSubmit}>
        <DialogContent>
          {error && <Typography color="error" align="center">Please select a item</Typography>}
          <List>
            <CategoriesList
              categories={categories}
              handleCategorySelect={this.handleCategorySelect}
              selectedCategoryIndex={this.state.selectedCategoryIndex}
              nestedList={({category}) => this.generateItemsForCategory(category)}
            />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideModal} color="primary">Cancel</Button>
          <Button type="submit" color="primary">Ok</Button>
        </DialogActions>
      </form>
    </Dialog>
    )
  }
}
