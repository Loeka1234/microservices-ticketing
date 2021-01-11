import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
	subject: Subjects.OrderCancelled;
	data: {
		id: string;
		version?: number; // TODO: fix this
		ticket: {
			id: string;
		};
	};
}
