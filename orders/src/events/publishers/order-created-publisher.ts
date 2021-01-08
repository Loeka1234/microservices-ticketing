import { Publisher, OrderCreatedEvent, Subjects } from "@loeka/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
}
