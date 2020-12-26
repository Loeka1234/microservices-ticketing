import { Ticket } from "../models/ticket";
import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
	res.json(await Ticket.find({}));
});

export { router as indexTicketRouter };
