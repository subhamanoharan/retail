import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const styles = theme => ({
  option: {
     '&[data-focus="true"]': {
       backgroundColor: '#A9A9A9',
       borderColor: 'transparent',
     }
   }
 });

export class BarCodeInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {code : ''}
    this.onScanComplete = this.onScanComplete.bind(this);
    this.onScanInput = this.onScanInput.bind(this);
    this.onScanInput = this.onScanInput.bind(this);
  }

  onScanComplete(event){
    event.preventDefault();
    this.props.onScanComplete(this.state.code.barcode || this.state.code  );
    this.setState({code: ''});
  }

  onScanInput(event, v) {
    this.setState({code: v});
  }

  render() {
    const { searchableMasterList, classes } = this.props;
    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: option => option.name,
    });
    return (
      <Card>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={this.onScanComplete}>
            <Grid container spacing={4}>
              <Grid item xs={11}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  disableClearable
                  options={searchableMasterList}
                  getOptionLabel={(option) =>
                    option ? (`${option.name} - Rs.${option.sp}` + (option.byWeight ? '/kg' : '')) : ''}
                  onChange={this.onScanInput}
                  value={this.state.code}
                  autoFocus
                  filterOptions={filterOptions}
                  classes={{ option: classes.option }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Enter barcode or name"
                      variant="outlined"
                      autoFocus
                      inputRef={input => input && input.focus()}
                    />}
                />
              </Grid>
              <Grid item>
                <Button type="submit" color="primary" size="small" variant="contained">Scan</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(BarCodeInputField);
