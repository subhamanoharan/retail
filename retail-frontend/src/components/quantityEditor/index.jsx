import React, { Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export default class QuantityEditor extends Component {
  render(){
    const {value, tableMeta: {rowIndex}, incrementQuantity, decrementQuantity, getQuantity} = this.props;
    return (
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={2}>
          <Button disabled={getQuantity(rowIndex) <= 1} color="primary" variant="contained" onClick={() => decrementQuantity(rowIndex)}>
            <RemoveIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center">{value}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={() => incrementQuantity(rowIndex)}>
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
}
