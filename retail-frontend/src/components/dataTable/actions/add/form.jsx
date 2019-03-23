import React from "react";

export default class AddItemForm extends React.Component {
  constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
   }

   onSubmit(itemData){
     return this.props.service.add(itemData)
   }

   render() {
     const {onSuccess, hideForm, addForm: AddItemForm} = this.props;
      return(
        <AddItemForm
          onSubmit={this.onSubmit}
          onSuccess={onSuccess}
          hideForm={hideForm}
        />
     );
   }
}
