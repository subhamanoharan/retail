import React, { Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default ({service}) => (
  <Card>
    <CardContent>
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h5" component="h2">{`No.of items: ${service.getTotalNoOfItems()}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" component="h2">{`Total: Rs.${service.getTotal()}`}</Typography>
      </Grid>
    </Grid>
    </CardContent>
  </Card>
);
