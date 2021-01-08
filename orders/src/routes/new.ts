import express, { Request, Response } from "express";
import {
	BadRequestError,
	NotFoundError,
	requireAuth,
	validateRequest,
} from "@loeka/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
	"/api/orders",
	requireAuth,
	[
		body("ticketId")
			.notEmpty()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage("TicketId must be provided"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { ticketId } = req.body;

		const ticket = await Ticket.findById(ticketId);
		if (!ticket) throw new NotFoundError();

		if (await ticket.isReserved())
			throw new BadRequestError("Ticket is already reserved");

		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			ticket,
		});
		await order.save();

		new OrderCreatedPublisher(natsWrapper.client).publish({
			id: order.id,
			status: order.status as OrderStatus,
			userId: order.userId,
			expiresAt: order.expiresAt.toISOString(),
			ticket: {
				id: order.ticket.id,
				price: order.ticket.price,
			},
		});

		res.status(201).json(order);
	}
);

export { router as newOrderRouter };
