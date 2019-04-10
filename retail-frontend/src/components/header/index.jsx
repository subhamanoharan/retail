import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';

export default class Header extends Component {
  render() {
    const {clearItems, generatePrintLines} = this.props
    return (
      <div style={{paddingTop: '10px'}}>
        <Grid container direction="row-reverse" spacing={8}>
          <Grid item>
            <PrintButton generatePrintLines={generatePrintLines}/>
          </Grid>
          <Grid item>
            <ClearButton clearItems={clearItems}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
