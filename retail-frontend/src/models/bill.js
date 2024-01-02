
export default class Bill {
  constructor(cart) {
    this.cart = cart;
    this.id = (Math.random() + 1).toString(36).substring(7)
  }

  getTotal() {
    return this.cart.getTotal()
  }

  count() {
    return this.cart.getItemsCount()
  }

  getFormattedTime() {
    const day = this.time.toLocaleDateString("en-US", { day: 'numeric' })
    const month = this.time.toLocaleDateString("en-US", { month: 'short' })
    const year = this.time.toLocaleDateString("en-US", { year: 'numeric' })
    const hours = this.time.getHours()
    const mins = this.time.getMinutes()
    const timeNotation = hours >= 12 ? 'PM' : 'AM'
    return `${day}/${month}/${year} ${hours == 12 ? 12 : hours%12}:${mins} ${timeNotation}`
  }
}
