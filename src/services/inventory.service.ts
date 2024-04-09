import { Bus } from "../models/bus.model";
import { Order } from "../models/order.model";
import { BusEvent } from "../models/bus-event.model";
import { BusListener } from "../interfaces/bus-listener.interface";

export class InventoryService implements BusListener {
  private static readonly MIN_CAPACITY = 0;
  private static instance: InventoryService;
  private capacity: number;

  private constructor(private readonly bus: Bus, capacity: number) {
    this.capacity = Math.max(capacity, InventoryService.MIN_CAPACITY);
  }

  static getInstance(bus: Bus, capacity: number) {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService(bus, capacity);
    }
    return InventoryService.instance;
  }

  onEvent(event: BusEvent) {
    if (event.getName() === "TicketBooked") {
      const quantity = event.getValue<number>();
      this.handleTicketBookedEvent(quantity);
    }
  }

  getCapacity() {
    return this.capacity;
  }

  private handleTicketBookedEvent(quantity: number) {
    const capacityLeft = this.onTicketBooked(quantity);

    if (capacityLeft >= InventoryService.MIN_CAPACITY) {
      const order = new Order(Order.generateId(), new Date(), quantity, Order.generateId());
      this.bus.send(new BusEvent("InventoryChanged", capacityLeft));
      this.bus.send(new BusEvent("BookingConfirmed", order));
    } else {
      this.bus.send(new BusEvent("BookingCancelled", InventoryService.MIN_CAPACITY));
    }
  }

  private onTicketBooked(quantity: number) {
    this.capacity -= quantity;
    return this.capacity;
  }
}
