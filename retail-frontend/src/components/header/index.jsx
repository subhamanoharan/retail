import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';

export default class Header extends Component {
  render() {
    const {clearItems, service} = this.props
    return (
      <div style={{paddingTop: '10px'}}>
        <Grid container direction="row-reverse" spacing={8}>
          <Grid item>
            <PrintButton billService={service}/>
          </Grid>
          <Grid item>
            <ClearButton clearItems={clearItems}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
