import { Bus } from "./models/bus.model";
import { BookingService } from "./services/booking.service";
import { InventoryService } from "./services/inventory.service";
import { NotificationService } from "./services/notification.service";

const bus = Bus.getInstance();

const bookingService = BookingService.getInstance(bus);
const inventoryService = InventoryService.getInstance(bus, 8);
const notificationService = NotificationService.getInstance();

bus.subscribe(notificationService);
bus.subscribe(inventoryService);
bus.subscribe(bookingService);

bookingService.bookTickets(2);
