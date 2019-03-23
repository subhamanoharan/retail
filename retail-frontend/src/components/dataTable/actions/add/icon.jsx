import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import AddItemForm from './form';

export default class AddItemIcon extends React.Component {
  constructor(props){
    super(props);
    this.state = {showAddItem: false};
    this.onAddItemAction = this.onAddItemAction.bind(this);
    this.onAddItemSuccess = this.onAddItemSuccess.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  onAddItemAction(){
    this.setState({showAddItem: true});
  }

  onAddItemSuccess(){
    this.hideForm();
    this.props.refreshItems();
  }

  hideForm(){
    this.setState({showAddItem: false});
  }

  render() {
    const {showAddItem} = this.state;
    const {service, addForm} = this.props;
    return (
      <Tooltip title={"Add"}>
        <IconButton onClick={this.onAddItemAction}>
          <AddIcon />
          {showAddItem &&
            <AddItemForm
              onSuccess={this.onAddItemSuccess}
              hideForm={this.hideForm}
              service={service}
              addForm={addForm}
            />
          }
        </IconButton>
      </Tooltip>
    );
  }
}
