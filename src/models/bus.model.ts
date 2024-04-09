import { BusEvent } from "./bus-event.model";
import { BusListener } from "../interfaces/bus-listener.interface";

export class Bus {
  private readonly listeners: BusListener[] = [];

  subscribe(listener: BusListener) {
    this.listeners.push(listener);
  }

  send(event: BusEvent) {
    for (const listener of this.listeners) {
      listener.onEvent(event);
    }
  }
}
