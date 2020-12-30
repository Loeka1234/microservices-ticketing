import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@loeka/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
