import React from "react";

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
  subHeader: {
    backgroundColor: '#2196f3',
    marginTop: '5px'
  }
});

const ItemsByWeightList = ({ items, handleItemSelect, selectedItem, classes}) => {
  const subheader =
    (<ListSubheader component="div">
      <Grid container spacing={8} alignItems="center" className={classes.subHeader}>
        <Grid item xs={4}><Typography>Code</Typography></Grid>
        <Grid item xs={4}><Typography>Name</Typography></Grid>
        <Grid item xs={4}><Typography>Price</Typography></Grid>
      </Grid>
    </ListSubheader>);
  return (
    <List subheader={subheader}>
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

export default withStyles(styles)(ItemsByWeightList);
