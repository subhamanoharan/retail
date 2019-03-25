import React, { Component} from 'react';

import Button from '@material-ui/core/Button';
import {sendText} from './driver';

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
		      .then(() => {
            console.log('OPened');
            return d.selectConfiguration(1)
          })
	        .then(() => {
            console.log('claiming Interface');
            return d.claimInterface(d.configuration.interfaces[0].interfaceNumber)
          })
       };
     navigator.usb.requestDevice({ filters: [{ vendorId: 1110 }] })
      .then(() =>  navigator.usb.getDevices())
      .then(devices => {
        if (devices.length > 0) {
          this.device = devices[0];
          return setup(this.device);
        }
      })
      .then(() => this.print())
      .catch(error => { console.log(error); });

  }

  print(){
    sendText(this.device, 'Demo  TEST---')
      .then((r) => { console.log('Printing over', r); })
      .catch(error => { console.log(error); })
  }

  render(){
    return (
      <Button onClick={this.blah} color="primary">Print</Button>
    );
  }
}
