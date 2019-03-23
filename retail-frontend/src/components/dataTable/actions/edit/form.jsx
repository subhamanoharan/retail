import React from "react";

export default class EditForm extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(updatedItemData){
    return this.props.service.edit(this.props.item.id, {...this.props.item, ...updatedItemData});
  }

  render() {
     const {item, onSuccess, hideForm, editForm: EditForm} = this.props;
     return (
        <EditForm
          item={item}
          onSubmit={this.onSubmit}
          onSuccess={onSuccess}
          hideForm={hideForm}
        />
      );
   }
}
