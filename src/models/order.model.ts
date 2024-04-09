export class Order {
  private static readonly DEFAULT_ID_LENGTH = 8;

  constructor(
    private readonly id: string,
    private readonly date: Date,
    private readonly quantity: number,
    private readonly clientId: string
  ) {}

  static generateId(length = Order.DEFAULT_ID_LENGTH) {
    return Array.from({ length }, () => Math.random().toString(36)[2]).join("");
  }

  getId() {
    return this.id;
  }

  getDate() {
    return this.date;
  }

  getQuantity() {
    return this.quantity;
  }

  getClientId() {
    return this.clientId;
  }
}
