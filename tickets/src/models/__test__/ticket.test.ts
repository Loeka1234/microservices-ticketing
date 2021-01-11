import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async done => {
	const ticket = Ticket.build({
		title: "concert",
		price: 5,
		userId: "123",
	});

	await ticket.save();

	const firstInstance = await Ticket.findById(ticket.id);
	const secondInstance = await Ticket.findById(ticket.id);

	firstInstance!.set({ price: 20 });
	secondInstance!.set({ price: 15 });

	await firstInstance!.save();

	try {
		await secondInstance!.save(); // This should throw an error
	} catch (err) {
		return done();
	}

	throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
	const ticket = Ticket.build({
		title: "concert",
		price: 20,
		userId: "123",
	});

	for (let i = 0; i < 3; i++) {
		await ticket.save();
		expect(ticket.version).toEqual(i);
	}
});
