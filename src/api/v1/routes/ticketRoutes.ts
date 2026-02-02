import { Router } from "express";
import {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController,
  updateTicketController,
  deleteTicketController,
  getTicketUrgencyController,
} from "../controllers/ticketController";

const router = Router();

router.post("/tickets", createTicketController);

router.get("/tickets", getAllTicketsController);

router.get("/tickets/:id/urgency", getTicketUrgencyController);

router.get("/tickets/:id", getTicketByIdController);

router.put("/tickets/:id", updateTicketController);

router.delete("/tickets/:id", deleteTicketController);

export default router;
