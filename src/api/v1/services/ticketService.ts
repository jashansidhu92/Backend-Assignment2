import { tickets } from "../../../data/tickets";
import { Ticket, TicketPriority, TicketStatus } from "./ticketTypes";

const PRIORITIES: TicketPriority[] = ["critical", "high", "medium", "low"];
const STATUSES: TicketStatus[] = ["open", "in-progress", "resolved"];

export function createTicket(input: {
  title?: unknown;
  description?: unknown;
  priority?: unknown;
}): { ticket?: Ticket; error?: string } {
  const { title, description, priority } = input;

  if (!title) return { error: "Missing required field: title" };
  if (!description) return { error: "Missing required field: description" };

  if (typeof priority !== "string" || !PRIORITIES.includes(priority as TicketPriority)) {
    return { error: "Invalid priority. Must be one of: critical, high, medium, low" };
  }

  const nextId = tickets.length ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;

  const newTicket: Ticket = {
    id: nextId,
    title: String(title),
    description: String(description),
    priority: priority as TicketPriority,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  tickets.push(newTicket);
  return { ticket: newTicket };
}

export function getAllTickets(): Ticket[] {
  return tickets;
}

export function getTicketById(id: number): Ticket | undefined {
  return tickets.find((t) => t.id === id);
}

export function updateTicket(
  id: number,
  input: { priority?: unknown; status?: unknown }
): { ticket?: Ticket; error?: string; notFound?: boolean } {
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return { notFound: true };

  if (input.priority !== undefined) {
    if (typeof input.priority !== "string" || !PRIORITIES.includes(input.priority as TicketPriority)) {
      return { error: "Invalid priority. Must be one of: critical, high, medium, low" };
    }
    ticket.priority = input.priority as TicketPriority;
  }

  if (input.status !== undefined) {
    if (typeof input.status !== "string" || !STATUSES.includes(input.status as TicketStatus)) {
      return { error: "Invalid status. Must be one of: open, in-progress, resolved" };
    }
    ticket.status = input.status as TicketStatus;
  }

  return { ticket };
}

export function deleteTicket(id: number): { deleted?: boolean; notFound?: boolean } {
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return { notFound: true };

  tickets.splice(index, 1);
  return { deleted: true };
}
