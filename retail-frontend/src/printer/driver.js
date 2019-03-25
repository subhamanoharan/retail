import EscPosEncoder from 'esc-pos-encoder';

export const sendText = (device, str) => {
  const encoder = new EscPosEncoder();

  const result = encoder
      .initialize()
      .text('The quick brown fox jumps over the lazy dog')
      .line('The is the first line')
      .line('And this is the second')
      .newline()
      .newline()
      .newline()
      .encode();
  return device.transferOut(3, result);
}
