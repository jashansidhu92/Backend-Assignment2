import { tickets } from "../../../data/tickets";
import { Ticket, TicketPriority } from "./ticketTypes";

const PRIORITIES: TicketPriority[] = ["critical", "high", "medium", "low"];

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

  const nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

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
