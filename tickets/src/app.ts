import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

// Routes
import { createTickerRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

// Middlewares
import { currentUser, errorHandler, NotFoundError } from "@loeka/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test",
	})
);
app.use(currentUser);

// Routes
app.use(createTickerRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// Not found error for all other routes
app.all("*", () => {
	throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };
