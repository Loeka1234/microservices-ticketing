import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
	const ticket = Ticket.build({
		title: "concert",
		price: 20,
	});
	await ticket.save();

	return ticket;
};

it("fetches orders for a particular user", async () => {
	const ticketOne = await buildTicket();
	const ticketTwo = await buildTicket();
	const ticketThree = await buildTicket();

	const userOne = global.signin();
	const userTwo = global.signin();

	// User one order
	await request(app)
		.post("/api/orders")
		.set("Cookie", userOne)
		.send({ ticketId: ticketOne.id })
		.expect(201);

	// User two orders
	const { body: orderOne } = await request(app)
		.post("/api/orders")
		.set("Cookie", userTwo)
		.send({ ticketId: ticketTwo.id })
		.expect(201);
	const { body: orderTwo } = await request(app)
		.post("/api/orders")
		.set("Cookie", userTwo)
		.send({ ticketId: ticketThree.id })
		.expect(201);

	// User one get orders
	const { body: body1 } = await request(app)
		.get("/api/orders")
		.set("Cookie", userOne)
		.expect(200);
	// User two get orders
	const { body: body2 } = await request(app)
		.get("/api/orders")
		.set("Cookie", userTwo)
		.expect(200);

	expect(body1).toHaveLength(1);
	expect(body2).toHaveLength(2);
	expect(orderOne).toEqual(body2[0]);
	expect(orderTwo).toEqual(body2[1]);
});
