import {IItem} from '../../interfaces';
import barcodeValidator from './barcodeValidator';
import priceValidator from './priceValidator';

const validate = (item: IItem) => priceValidator(item)
  .then(() => barcodeValidator(item));

export default {validate};
