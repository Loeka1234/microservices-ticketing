import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";

const checkEnvVariables = (variables: string[]) => {
	for (const v of variables)
		if (!process.env[v]) throw new Error(`${v} must be defined`);
};

const start = async () => {
	checkEnvVariables([
		"JWT_KEY",
		"MONGO_URI",
		"NATS_CLIENT_ID",
		"NATS_URL",
		"NATS_CLUSTER_ID",
	]);

	try {
		await natsWrapper.connect(
			process.env.NATS_CLUSTER_ID!,
			process.env.NATS_CLIENT_ID!,
			process.env.NATS_URL!
		);
		natsWrapper.client.on("close", () => {
			console.log("NATS connection closed.");
			process.exit();
		});

		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		await mongoose.connect(process.env.MONGO_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Connected to MongoDB");

		new TicketCreatedListener(natsWrapper.client).listen();
		new TicketUpdatedListener(natsWrapper.client).listen();
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => console.log("Listening on port 3000"));
};

start();
