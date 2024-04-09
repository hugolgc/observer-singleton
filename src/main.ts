import { Bus } from "./models/bus.model";
import { BookingService } from "./services/booking.service";
import { InventoryService } from "./services/inventory.service";
import { NotificationService } from "./services/notification.service";

const purchaseBus = new Bus();

const bookingService = BookingService.getInstance(purchaseBus);
const inventoryService = InventoryService.getInstance(purchaseBus, 8);
const notificationService = NotificationService.getInstance();

purchaseBus.subscribe(notificationService);
purchaseBus.subscribe(inventoryService);
purchaseBus.subscribe(bookingService);

bookingService.bookTickets(2);
