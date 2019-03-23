import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

import EditItemForm from './form';

export default class EditItemIcon extends React.Component {
  constructor(props){
    super(props);
    this.state = {showEditItem: false};
    this.onEditItemAction = this.onEditItemAction.bind(this);
    this.onEditItemSuccess = this.onEditItemSuccess.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  onEditItemAction(){
    this.setState({showEditItem: true});
  }

  onEditItemSuccess(){
    // this.hideForm();
    this.props.refreshItems();
  }

  hideForm(){
    this.setState({showEditItem: false});
  }

  render() {
    const {showEditItem} = this.state;
    const {item, service, editForm} = this.props;
    return (
      <Tooltip title={"Edit"}>
        <IconButton onClick={this.onEditItemAction}>
          <EditIcon />
          {showEditItem && <EditItemForm
            item={item}
            onSuccess={this.onEditItemSuccess}
            hideForm={this.hideForm}
            service={service}
            editForm={editForm}
          />}
        </IconButton>
      </Tooltip>
    );
  }
}
