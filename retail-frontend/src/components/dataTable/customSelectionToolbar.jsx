import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import P from 'bluebird';

import EditItemIcon from './actions/edit/icon';

export default class CustomDataTableSelectionToolbar extends React.Component {
  constructor(props){
    super(props);
    this.onDeleteItems = this.onDeleteItems.bind(this);
  }

  onDeleteItems(){
    const {items, refreshItems, selectedRows: {data}, service} = this.props;
    const itemsToDelete = data.map(({index}) => items[index]);
    P.map(itemsToDelete, (i) => service.delete(i))
      .then(refreshItems)
  }

  render() {
    const {selectedRows: {data}, refreshItems, items, service, editForm} = this.props;
    const isOneRowSelected = data.length === 1;
    const itemToEdit = items[data[0].index];
    return (
      <div>
        { isOneRowSelected && editForm &&
          <EditItemIcon
            item={itemToEdit}
            refreshItems={refreshItems}
            service={service}
            editForm={editForm}
          />
        }
        <Tooltip title="Delete">
          <IconButton onClick={this.onDeleteItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}
