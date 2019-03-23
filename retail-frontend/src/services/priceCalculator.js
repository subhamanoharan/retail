export default (items) =>
  items.reduce((acc, {sp, quantity}) => sp * quantity + acc, 0);
