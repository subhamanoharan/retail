import React, { Component} from 'react';

import Button from '@material-ui/core/Button';

export default class PrintDemo extends Component {
  constructor(props) {
    super(props);
    this.print = this.print.bind(this);
    this.blah = this.blah.bind(this);
    this.device = null;
  }

  blah(){
    const setup = (d) => {
		    return d.open()
		      .then(() => d.selectConfiguration(1))
	        .then(() => d.claimInterface(0))
       };
     navigator.usb.requestDevice({ filters: [{ vendorId: '32902' }] })
      .then(() =>   navigator.usb.getDevices())
      .then(devices => {
        console.log('Found  devices', devices)
        if (devices.length > 0) {
          this.device = devices[0];
          return setup(this.device);
        }
      })
      .then(() => this.print())
      .catch(error => { console.log(error); });

  }

  print(){
    console.log('Printing......')
    var encoder = new TextEncoder();
    var data = encoder.encode('Demo  TEST---');
    this.device.transferOut(1, data)
      .then(() => { console.log('Printing over'); })
      .catch(error => { console.log(error); })
  }

  render(){
    return (
      <Button onClick={this.blah} color="primary">Print</Button>
    );
  }
}
