import {splitByLength, replaceFrom} from '../../stringUtility';

export default class NameColumn {
  constructor(cart, maxLength, startIndex){
    this.names = cart.getCartItems().map(({name}) => name);
    this.maxLength = maxLength;
  }


  setStartIndex(previousColumn){
    this.startIndex = previousColumn ? (previousColumn.startIndex + previousColumn.maxLength + 1) : 0;
  }

  getFormattedLines(index, line){
    const nameColumnValues = splitByLength(this.names[index] , this.maxLength);
    return nameColumnValues.reduce((acc, ncv, i) => {
      if(i===0)
        return [replaceFrom(line, ncv, this.startIndex)]
      const emptyLine = new Array(line.length + 1).join(' ');
      return [...acc, replaceFrom(emptyLine, ncv, this.startIndex)]
    }, []);
  }
}
