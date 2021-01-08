import { Publisher, Subjects, OrderCancelledEvent } from "@loeka/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
