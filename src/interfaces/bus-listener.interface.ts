import { BusEvent } from "../models/bus-event.model";

export interface BusListener {
  onEvent(event: BusEvent): void;
}
