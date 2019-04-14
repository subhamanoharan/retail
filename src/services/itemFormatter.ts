import {IItem} from '../interfaces';

export default (item: IItem): IItem => {
  const {name, sp, barcode, byWeight, category} = item;
  return {name, sp, barcode: barcode.toLowerCase(), byWeight, category};
}
