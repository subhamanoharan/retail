import EscPosEncoder from 'esc-pos-encoder';
import lodash from 'lodash';

export const sendText = (device, lines) => {
  const encoder = new EscPosEncoder();

  const printerEncoder = encoder.initialize();
  // printerEncoder.raw([0x1B, 0x21, 0x21])

  lines.forEach(l => printerEncoder.line(l))
  const result = printerEncoder.newline()
  //double height
    .raw([0x1B, 0x21, 0x21])
    .line('test-line-test-line-test-line-test-line-test-line-21')
    //double width
    .raw([0x1B, 0x21, 0x12])
    .line('test-line-test-line-test-line-test-line-test-line-12')
    .newline()
    .newline()
    .newline()
    // command for full cut
    .raw([0x1D, 0x56, 0x00])
    .encode();
  return device.transferOut(3, result);
}
