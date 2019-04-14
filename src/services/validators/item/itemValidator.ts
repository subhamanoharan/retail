import {IItem} from '../../../interfaces';
import barcodeValidator from './barcodeValidator';
import priceValidator from './priceValidator';
import nameValidator from './nameValidator';
import categoryValidator from './categoryValidator';
import itemByWeightValidator from './itemByWeightValidator';

const validate = (item: IItem, itemId?) =>
  nameValidator(item)
    .then(() => priceValidator(item))
    .then(() => itemByWeightValidator(item))
    .then(() => barcodeValidator(item, itemId));

export default {validate};
