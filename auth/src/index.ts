import express from "express";
import "express-async-errors";
// Routes
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

// Middlewares
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Not found error for all other routes
app.all("*", (req, res) => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

app.listen(3000, () => console.log("Listening on port 3000"));
