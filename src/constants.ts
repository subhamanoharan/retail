export default {
  ERRORS: {
    BARCODE_EXISTS: (item) => `An item with barcode "${item.barcode}" already exists.
    Please try another barcode or edit the existing item`,
    INVALID_PRICE: 'Please enter a valid number for price',
    INVALID_BARCODE: 'Please enter a valid barcode'
  }
}
