import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import P from 'bluebird';
import { withSnackbar } from 'notistack';

import EditItemIcon from './actions/edit/icon';

export class CustomDataTableSelectionToolbar extends React.Component {
  constructor(props){
    super(props);
    this.onDeleteItems = this.onDeleteItems.bind(this);
  }

  onDeleteItems() {
    const {items, refreshItems, selectedRows: {data}, service} = this.props;
    const itemsToDelete = data.map(({dataIndex: index}) => items[index]);
    return P.map(itemsToDelete, (i) => service.delete(i))
      .then(refreshItems)
      .catch((errors) => {
        if(errors)
          errors.map(e => this.props.enqueueSnackbar(e, {variant: 'error'}))
      })
  }

  render() {
    const {selectedRows: {data = []} = {}, refreshItems, items, service, editForm} = this.props;
    const isOneRowSelected = data.length === 1;
    return (
      <div>
        { isOneRowSelected && editForm &&
          <EditItemIcon
            item={items[data[0].dataIndex]}
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

export default withSnackbar(CustomDataTableSelectionToolbar);
