import {IItem} from '../interfaces';

export default (item: IItem): IItem => {
  const {name, sp, barcode} = item;
  return {name, sp, barcode: barcode.toLowerCase()};
}
