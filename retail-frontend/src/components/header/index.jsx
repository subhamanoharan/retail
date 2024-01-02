import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';

import PrintButton from '../printButton';
import ClearButton from '../clearButton';
import LoadPastBillDropDown from '../loadPastBillDropDown';

export default class Header extends Component {
  render() {
    const {clearItems, generatePrintLines, billHistory, onLoadOldBill} = this.props
    return (
      <div style={{paddingTop: '10px'}}>
        <Grid container direction="row-reverse" spacing={8}>
          <Grid item>
            <PrintButton generatePrintLines={generatePrintLines}/>
          </Grid>
          <Grid item>
            <ClearButton clearItems={clearItems}/>
          </Grid>
          <Grid item xs={3}>
            <LoadPastBillDropDown
              bills={billHistory}
              onSubmit={onLoadOldBill}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
