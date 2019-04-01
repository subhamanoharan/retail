import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';

export default class Header extends Component {
  render() {
    return (
      <div style={{paddingTop: '10px'}}>
        <Grid container direction="row-reverse" spacing={8}>
          <Grid item>
            <PrintButton/>
          </Grid>
          <Grid item>
            <ClearButton/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
