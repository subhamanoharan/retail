import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default ({ items, handleItemSelect, selectedItem}) => {
  return (
    <List>
      {items.map(i => (
        <ListItem
          button
          key={i.name}
          divider
          onClick={handleItemSelect(i)}
          selected={selectedItem && i.barcode === selectedItem.barcode}
        >
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={4}><Typography>{i.barcode}</Typography></Grid>
            <Grid item xs={4}><Typography>{i.name}</Typography></Grid>
            <Grid item xs={4}><Typography>{`${i.sp}/kg`}</Typography></Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );

}
