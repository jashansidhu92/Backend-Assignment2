import request from "supertest";
import app from "../src/app";
import { tickets } from "../src/data/tickets";

describe("Ticket Routes (CRUD)", () => {
  beforeEach(() => {
    tickets.length = 0;

    tickets.push({
      id: 1,
      title: "Seed ticket",
      description: "Seed description",
      priority: "low",
      status: "open",
      createdAt: new Date().toISOString(),
    });
  });

  it("should create a ticket (POST /api/v1/tickets)", async () => {
    const payload = {
      title: "New ticket",
      description: "Testing create",
      priority: "medium",
    };

    const res = await request(app).post("/api/v1/tickets").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(payload.title);
    expect(res.body.status).toBe("open");
    expect(res.body).toHaveProperty("createdAt");
  });

  it("should return 400 when title is missing (POST /api/v1/tickets)", async () => {
    const payload = { description: "No title", priority: "low" };

    const res = await request(app).post("/api/v1/tickets").send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required field: title");
  });

  it("should return all tickets (GET /api/v1/tickets)", async () => {
    const res = await request(app).get("/api/v1/tickets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should return 404 for unknown ticket (GET /api/v1/tickets/:id)", async () => {
    const res = await request(app).get("/api/v1/tickets/9999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Ticket not found");
  });

  it("should return 400 for invalid status (PUT /api/v1/tickets/:id)", async () => {
    const payload = { status: "done" };
    const res = await request(app).put("/api/v1/tickets/1").send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid status. Must be one of: open, in-progress, resolved");
  });

  it("should delete a ticket (DELETE /api/v1/tickets/:id)", async () => {
    const res = await request(app).delete("/api/v1/tickets/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Ticket deleted");
  });
});
