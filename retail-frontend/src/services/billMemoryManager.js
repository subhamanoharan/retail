import Bill from '../models/bill';

const BILLS_LIMIT = 5
export default class BillMemoryManager {
  constructor() {
    this.stack = []
  }

  add(cart) {
    this.stack =[new Bill(cart), ...this.stack.slice(0, BILLS_LIMIT -1)]
  }

  remove(bill) {
    this.stack = this.stack.filter((b) => b.id != bill.id)
  }

  getBills() {
    return [...this.stack]
  }
}
