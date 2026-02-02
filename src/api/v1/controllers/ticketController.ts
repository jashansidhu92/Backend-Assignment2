import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../services/ticketService";
import { calculateUrgency } from "../services/urgencyService";

export function createTicketController(req: Request, res: Response) {
  const result = createTicket(req.body);

  if (result.error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
  }

  return res.status(HTTP_STATUS.CREATED).json(result.ticket);
}

export function getAllTicketsController(req: Request, res: Response) {
  return res.status(HTTP_STATUS.OK).json(getAllTickets());
}

export function getTicketByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  }

  return res.status(HTTP_STATUS.OK).json(ticket);
}

export function updateTicketController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = updateTicket(id, req.body);

  if (result.notFound) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  }

  if (result.error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
  }

  return res.status(HTTP_STATUS.OK).json(result.ticket);
}

export function deleteTicketController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = deleteTicket(id);

  if (result.notFound) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  }

  return res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" });
}

export function getTicketUrgencyController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  }

  const urgency = calculateUrgency(ticket);

  return res.status(HTTP_STATUS.OK).json({
    id: ticket.id,
    priority: ticket.priority,
    status: ticket.status,
    urgencyScore: urgency.urgencyScore,
    urgencyLevel: urgency.urgencyLevel,
  });
}
