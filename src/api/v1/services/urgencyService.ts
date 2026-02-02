import { Ticket } from "./ticketTypes";

const BASE_SCORES: Record<string, number> = {
  critical: 50,
  high: 30,
  medium: 20,
  low: 10,
};

const AGE_MULTIPLIER = 2;

export function calculateUrgency(ticket: Ticket): {
  urgencyScore: number;
  urgencyLevel: string;
} {
  
  if (ticket.status === "resolved") {
    return {
      urgencyScore: 0,
      urgencyLevel: "RESOLVED",
    };
  }

  const createdDate = new Date(ticket.createdAt);
  const now = new Date();

  const ageInDays = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const baseScore = BASE_SCORES[ticket.priority];
  const urgencyScore = baseScore + ageInDays * AGE_MULTIPLIER;

  let urgencyLevel = "LOW";

  if (urgencyScore >= 70) urgencyLevel = "CRITICAL";
  else if (urgencyScore >= 50) urgencyLevel = "HIGH";
  else if (urgencyScore >= 30) urgencyLevel = "MEDIUM";

  return {
    urgencyScore,
    urgencyLevel,
  };
}
