import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

// Routes
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

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
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

// Not found error for all other routes
app.all("*", () => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };
