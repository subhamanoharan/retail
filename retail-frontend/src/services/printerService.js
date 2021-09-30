import {sendText} from './driver';

const VENDOR_ID = 1110;

class PrinterService {
  constructor(){
    this.device = null;
  }

  async pair() {
    try{
      await navigator.usb.requestDevice({ filters: [{ vendorId: VENDOR_ID }] })
      const devices = await navigator.usb.getDevices()
      const deviceToPair = devices[0];
      await deviceToPair.open();
      await deviceToPair.selectConfiguration(1);
      await deviceToPair.claimInterface(deviceToPair.configuration.interfaces[0].interfaceNumber);
      this.device = deviceToPair;
    } catch(e){
      console.log('Failed to pair with device', e)
    }
  }

  async unpair() {
    try{
      const devices = await navigator.usb.getDevices()
      console.log("devices", devices)
      const deviceToPair = devices[0];
      await deviceToPair.close();
      await deviceToPair.releaseInterface(deviceToPair.configuration.interfaces[0].interfaceNumber);
      this.device = null;
    } catch(e){
      console.log('Failed to unpair with device', e)
    }
  }

  print(lines){
    return sendText(this.device, lines)
      .then((r) => { console.log('Printing over', r); })
      .catch(error => { console.log(error); })
  }

  isPaired() {
    const {opened, configuration} = this.device || {};
    const {interfaces: [{claimed}] = [{}]} = configuration || {};
    return opened && claimed;
  }
}

export default new PrinterService;
