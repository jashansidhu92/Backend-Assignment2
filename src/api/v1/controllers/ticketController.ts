import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { createTicket } from "../services/ticketService";

export function createTicketController(req: Request, res: Response) {
  const result = createTicket(req.body);

  if (result.error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
  }

  return res.status(HTTP_STATUS.CREATED).json(result.ticket);
}
