import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddItemByWeightIcon from "@material-ui/icons/LocalGroceryStore";
import AddItemByWeightForm from "./form";

export default class Icon extends React.Component {
  constructor(props){
    super(props);
    this.state = {showForm: false};
    this.onAction = this.onAction.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  onAction(){
    this.setState({showForm: true});
  }

  onSuccess(item, weight, units){
    this.hideForm();
    this.props.onSuccess(item, weight, units);
  }

  hideForm(){
    this.setState({showForm: false});
  }

  render() {
    const {showForm} = this.state;
    const {masterList} = this.props;
    return (
      <Tooltip title={"Add item by weight"}>
        <IconButton onClick={this.onAction}>
          <AddItemByWeightIcon />
          {showForm &&
            <AddItemByWeightForm
              masterList={masterList}
              hideForm={this.hideForm}
              onSuccess={this.onSuccess}
            />}
        </IconButton>
      </Tooltip>
    );
  }
}
