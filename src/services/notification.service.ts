import { BusEvent } from "../models/bus-event.model";
import { BusListener } from "../interfaces/bus-listener.interface";

export class NotificationService implements BusListener {
  private static instance: NotificationService;
  private constructor() {}

  static getInstance() {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return this.instance;
  }

  onEvent(event: BusEvent) {
    this.log("BusEvent:", event.getName(), event.getValue());
  }

  private log(...args: any[]) {
    console.log(...args);
  }
}
