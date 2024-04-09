import { Bus } from "../models/bus.model";
import { Order } from "../models/order.model";
import { BusEvent } from "../models/bus-event.model";
import { OrderDto } from "../interfaces/order-dto.interface";
import { BusListener } from "../interfaces/bus-listener.interface";

export class BookingService implements BusListener {
  private static instance: BookingService;
  private constructor(private readonly bus: Bus) {}

  static getInstance(bus: Bus) {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService(bus);
    }
    return BookingService.instance;
  }

  onEvent(event: BusEvent) {
    if (event.getName() === "BookingConfirmed") {
      const order = event.getValue<Order>();
      this.handleBookingConfirmedEvent(order);
    }
  }

  bookTickets(quantity: number) {
    this.bus.send(new BusEvent("TicketBooked", quantity));
  }

  private handleBookingConfirmedEvent(order: Order) {
    const orderDto: OrderDto = { id: order.getId(), clientId: order.getClientId() };
    this.bus.send(new BusEvent("ConfirmationSent", orderDto));
  }
}
