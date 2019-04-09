import EscPosEncoder from 'esc-pos-encoder';
import lodash from 'lodash';

export const sendText = (device, lines) => {
  const encoder = new EscPosEncoder();

  const printerEncoder = encoder.initialize();
  printerEncoder.line(lodash.pad('M.S.Gurusamy Stores', 32))
  printerEncoder.line(lodash.pad('124 Kamarajar Salai', 32))
  printerEncoder.line(new Array(32 + 1).join('-'));
  printerEncoder.newline();
  lines.forEach(l => printerEncoder.line(l))
  const result = printerEncoder.newline()
    .newline()
    .newline()
    .newline()
    .encode();
  return device.transferOut(3, result);
}
