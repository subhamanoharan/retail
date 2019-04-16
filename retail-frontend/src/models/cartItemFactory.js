import CartItemByUnit from './cartItemByUnit';
import CartItemByWeight from './cartItemByWeight';

export default (item) => item.byWeight ? new CartItemByWeight(item) : new CartItemByUnit(item)
