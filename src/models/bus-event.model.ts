import { BusEventName } from "../types/bus-event-name.type";

export class BusEvent {
  constructor(private readonly name: BusEventName, private readonly value: any) {}

  getName() {
    return this.name;
  }

  getValue<T>() {
    return this.value as T;
  }
}
