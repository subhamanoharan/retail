import deepFreeze from 'deep-freeze';
import ImmutableCart from './immutableCart';
import CartItemByUnit from './cartItemByUnit';

describe('ImmutableCart', () => {
  const item1 = {name: 'a1', quantity: 15, barcode: '123', sp: 1};
  const item2 = {name: 'a2', quantity: 5, barcode: '124', sp: 2};
  const initialItems = [item1, item2];

  //This is to check that the array is not mutated by any further operation
  deepFreeze(initialItems);

  const immutableCart = new ImmutableCart(initialItems);

  describe('deleteItem', () =>{
    it('should delete item', () => {
      const item3 = {name: 'a3', barcode: '125', sp: 5};
      const expectedItem3 = {...item3, quantity: 12};

      const cartAfterAdding = immutableCart.addItem(item3, 12);
      const cartAfterDeleting = immutableCart.deleteItem(item3);
      const items = cartAfterDeleting.getItems();

      expect(items).toHaveLength(2)
      const [i1, i2] = items;
      expect(i1).toEqual(item1);
      expect(i2).toEqual(item2);
    });
  });

  describe('addItem', () =>{
    it('should add a new item', () => {
      const item3 = {name: 'a3', barcode: '125', sp: 5};
      const expectedItem3 = {...item3, quantity: 12};

      const cartAfterAdding = immutableCart.addItem(item3, 12);
      const items = cartAfterAdding.getItems();

      expect(items).toHaveLength(3)
      const [i1, i2, i3] = items;
      expect(i1).toEqual(item1);
      expect(i2).toEqual(item2);
      expect(i3).toEqual(expectedItem3);
    });

    it('should update quantity of existing item by 1 by default', () => {
      const cartAfterAdding = immutableCart.addItem({barcode: item2.barcode});
      const items = cartAfterAdding.getItems();

      expect(items).toHaveLength(2)
      const [i1, i2] = items;
      expect(i1).toEqual(item1);
      expect(i2).toEqual({...item2, quantity: item2.quantity + 1});
    });

    it('should update quantity of existing item by given quantity', () => {
      const cartAfterAdding = immutableCart.addItem({barcode: item2.barcode}, 3);
      const items = cartAfterAdding.getItems();

      expect(items).toHaveLength(2)
      const [i1, i2] = items;
      expect(i1).toEqual(item1);
      expect(i2).toEqual({...item2, quantity: item2.quantity + 3});
    });

    describe('item by weight', () => {
      it('should add a new item by weight', () => {
        const item3 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 12.5};
        const expectedItem3 = {...item3, quantity: 12};

        const cartAfterAdding = immutableCart.addItem(item3, 12);
        const items = cartAfterAdding.getItems();

        expect(items).toHaveLength(3)
        const [i1, i2, i3] = items;
        expect(i1).toEqual(item1);
        expect(i2).toEqual(item2);
        expect(i3).toEqual(expectedItem3);
      });

      it('should add another item by weight when weight differs', () => {
        const item3 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10};
        const item4 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 15};
        const expectedItem3 = {...item3, quantity: 1};
        const expectedItem4 = {...item4, quantity: 1};
        const cartAfterAdding = immutableCart.addItem(item3).addItem(item4);
        const items = cartAfterAdding.getItems();

        expect(items).toHaveLength(4)
        const [i1, i2, i3, i4] = items;
        expect(i1).toEqual(item1);
        expect(i2).toEqual(item2);
        expect(i3).toEqual(expectedItem3);
        expect(i4).toEqual(expectedItem4);
      });

      it('should add another item by weight when weight is same but barcode differs', () => {
        const item3 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10};
        const item4 = {name: 'a3', barcode: '129', sp: 5, byWeight: true, weight: 10};
        const expectedItem3 = {...item3, quantity: 1};
        const expectedItem4 = {...item4, quantity: 1};
        const cartAfterAdding = immutableCart.addItem(item3).addItem(item4);
        const items = cartAfterAdding.getItems();

        expect(items).toHaveLength(4)
        const [i1, i2, i3, i4] = items;
        expect(i1).toEqual(item1);
        expect(i2).toEqual(item2);
        expect(i3).toEqual(expectedItem3);
        expect(i4).toEqual(expectedItem4);
      });

      it('should update quantity of  item by weight when weight is the same', () => {
        const item3 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10};
        const item4 = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10};
        const expectedItem3 = {...item3, quantity: 14};
        const cartAfterAdding = immutableCart.addItem(item3).addItem(item4, 13);
        const items = cartAfterAdding.getItems();

        expect(items).toHaveLength(3)
        const [i1, i2, i3] = items;
        expect(i1).toEqual(item1);
        expect(i2).toEqual(item2);
        expect(i3).toEqual(expectedItem3);
      });
    });
  });

  describe('getTotal', () => {
    it('when there are items by unit', () => {
      expect(immutableCart.getTotal()).toEqual(25);
    });

    it('when there are items by weight', () => {
      const itemByWeight = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10.2};
      const cartAfterAdding = immutableCart.addItem(itemByWeight, 11);

      expect(cartAfterAdding.getTotal()).toEqual(586);
    });
  });

  it('clearCart', () => {
    const cleanCart = immutableCart.clear();
    expect(cleanCart.getItems()).toEqual([]);
  });

  describe('getTotalNoOfItems', () => {
    it('when there are items by unit', () => {
      expect(immutableCart.getTotalNoOfItems()).toEqual(20);
    });

    it('when there are items by weight', () => {
      const itemByWeight = {name: 'a3', barcode: '125', sp: 5, byWeight: true, weight: 10.2};
      const cartAfterAdding = immutableCart.addItem(itemByWeight, 11);

      expect(cartAfterAdding.getTotalNoOfItems()).toEqual(31);
    });
  });

  it('getCartItems', () => {
    expect(immutableCart.getCartItems()).toEqual([expect.any(CartItemByUnit), expect.any(CartItemByUnit)]);
  });
});
