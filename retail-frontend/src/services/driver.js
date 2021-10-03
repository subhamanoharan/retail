import EscPosEncoder from 'esc-pos-encoder';
import lodash from 'lodash';

export const sendText = (device, lines) => {
  const encoder = new EscPosEncoder();

  const printerEncoder = encoder.initialize();
  printerEncoder.raw([0x1B, 0x4D, 0])
  // printerEncoder.line('Font A abcdefghijkl')
  // printerEncoder.raw([0x1B, 0x4D, 1])
  // printerEncoder.line('Font B abcdefghijkl')

  lines.forEach(l => {
    if(l.emphasis){
      printerEncoder.raw([0x1B, 0x21, 0x33])
      printerEncoder.line(l.text)
      printerEncoder.raw([0x1B, 0x21, 0x21])
    }
    else
      printerEncoder.line(l)
  })
  const result = printerEncoder.newline()
    .newline()
    .newline()
    .newline()
    .newline()
    // command for full cut
    .raw([0x1D, 0x56, 0x00])
    .encode();
  return device.transferOut(3, result);
}
