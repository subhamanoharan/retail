import EscPosEncoder from 'esc-pos-encoder';
import lodash from 'lodash';

export const sendText = (device, lines) => {
  const encoder = new EscPosEncoder();

  const printerEncoder = encoder.initialize();
  printerEncoder.size('normal');
  lines.forEach(l => printerEncoder.line(l))
  const result = printerEncoder.newline()
    .newline()
    .newline()
    .newline()
    .raw([0x1D5600])
    .raw([0x1D, 0x56, 0x00])
    .raw([0x1D5601])
    .raw([0x1D, 0x56, 0x01])
    .cut('partial')
    .cut('full')
    .encode();
  return device.transferOut(3, result);
}
