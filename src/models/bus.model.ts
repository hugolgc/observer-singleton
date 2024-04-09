import { BusEvent } from "./bus-event.model";
import { BusListener } from "../interfaces/bus-listener.interface";

export class Bus {
  private static instance: Bus;
  private readonly listeners: BusListener[] = [];
  private constructor() {}

  static getInstance() {
    if (!Bus.instance) {
      Bus.instance = new Bus();
    }
    return this.instance;
  }

  subscribe(listener: BusListener) {
    this.listeners.push(listener);
  }

  send(event: BusEvent) {
    for (const listener of this.listeners) {
      listener.onEvent(event);
    }
  }
}
