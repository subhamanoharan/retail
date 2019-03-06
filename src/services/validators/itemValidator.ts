import {IItem} from '../../interfaces';
import barcodeValidator from './barcodeValidator';
import priceValidator from './priceValidator';
import nameValidator from './nameValidator';

const validate = (item: IItem) =>
  nameValidator(item)
    .then(() => priceValidator(item))
    .then(() => barcodeValidator(item));

export default {validate};
