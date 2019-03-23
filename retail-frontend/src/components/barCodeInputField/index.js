import React, { Component} from 'react';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class BarCodeInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {code : ''}
    this.onScanComplete = this.onScanComplete.bind(this);
    this.onScanInput = this.onScanInput.bind(this);
  }

  onScanComplete(event){
    event.preventDefault();
    this.props.onScanComplete(this.state.code);
    this.setState({code: ''});
  }

  onScanInput(event) {
    this.setState({code: event.target.value});
  }

  render() {
    return (
      <Card>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={this.onScanComplete}>
            <Grid container spacing={16}>
              <Grid item xs={11}>
                <TextField
                  id="barCodeInput"
                  value={this.state.code}
                  onChange={this.onScanInput}
                  autoFocus
                  fullWidth
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
