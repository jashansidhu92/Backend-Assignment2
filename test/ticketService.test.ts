import { calculateUrgency } from "../src/api/v1/services/urgencyService";
import { Ticket } from "../src/api/v1/services/ticketTypes";

describe("Urgency Service (calculateUrgency)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-02-01T00:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return RESOLVED for resolved tickets", () => {
    const ticket: Ticket = {
      id: 1,
      title: "Resolved",
      description: "Done",
      priority: "critical",
      status: "resolved",
      createdAt: "2026-01-20T00:00:00.000Z",
    };

    const result = calculateUrgency(ticket);

    expect(result.urgencyLevel).toBe("RESOLVED");
    expect(result.urgencyScore).toBe(0);
  });

  it("should increase urgency score as ticket age increases", () => {
    const newer: Ticket = {
      id: 2,
      title: "Newer",
      description: "Newer ticket",
      priority: "high",
      status: "open",
      createdAt: "2026-02-01T00:00:00.000Z",
    };

    const older: Ticket = {
      id: 3,
      title: "Older",
      description: "Older ticket",
      priority: "high",
      status: "open",
      createdAt: "2026-01-27T00:00:00.000Z",
    };

    const r1 = calculateUrgency(newer);
    const r2 = calculateUrgency(older);

    expect(r2.urgencyScore).toBeGreaterThan(r1.urgencyScore);
  });

  it("should return a valid urgency level string", () => {
    const ticket: Ticket = {
      id: 4,
      title: "Sample",
      description: "Check level",
      priority: "medium",
      status: "open",
      createdAt: "2026-01-30T00:00:00.000Z",
    };

    const result = calculateUrgency(ticket);

    expect(["LOW", "MEDIUM", "HIGH", "CRITICAL", "RESOLVED"]).toContain(result.urgencyLevel);
  });
});
