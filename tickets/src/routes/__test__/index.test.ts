import request from "supertest";
import { app } from "../../app";

it("can fetch a list of tickets", async () => {
	for (let i = 0; i < 3; i++) {
		await request(app)
			.post("/api/tickets")
			.set("Cookie", global.signin())
			.send({
				title: "My title",
				price: 20,
			});
	}

	const response = await request(app).get("/api/tickets").send().expect(200);

	expect(response.body.length).toEqual(3);
});
