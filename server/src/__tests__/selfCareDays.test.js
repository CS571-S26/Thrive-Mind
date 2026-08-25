import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp();

const signupAndGetAgent = async (email) => {
  const agent = request.agent(app);
  await agent.post("/api/auth/signup").send({
    email,
    password: "correcthorsebattery",
    displayName: "Student"
  });
  return agent;
};

describe("GET/PUT /api/self-care-days", () => {
  it("requires auth", async () => {
    const res = await request(app).get("/api/self-care-days");
    expect(res.status).toBe(401);
  });

  it("rejects a malformed date", async () => {
    const agent = await signupAndGetAgent("planner1@wisc.edu");
    const res = await agent
      .put("/api/self-care-days/not-a-date")
      .send({ checkedItems: { water: true } });

    expect(res.status).toBe(400);
  });

  it("upserts a day and reflects it in the history list", async () => {
    const agent = await signupAndGetAgent("planner2@wisc.edu");

    const put = await agent
      .put("/api/self-care-days/2026-08-20")
      .send({ checkedItems: { water: true, break: false } });
    expect(put.status).toBe(200);
    expect(put.body.checkedItems).toEqual({ water: true, break: false });

    // Upsert again for the same day — should update, not duplicate.
    await agent
      .put("/api/self-care-days/2026-08-20")
      .send({ checkedItems: { water: true, break: true } });

    const res = await agent.get("/api/self-care-days?days=90");
    expect(res.status).toBe(200);
    expect(Object.keys(res.body.history)).toHaveLength(1);
    expect(res.body.history["2026-08-20"]).toEqual({
      water: true,
      break: true
    });
  });

  it("never returns or lets another user overwrite your days", async () => {
    const agentA = await signupAndGetAgent("plannerA@wisc.edu");
    const agentB = await signupAndGetAgent("plannerB@wisc.edu");

    await agentA
      .put("/api/self-care-days/2026-08-20")
      .send({ checkedItems: { water: true } });

    const listB = await agentB.get("/api/self-care-days?days=90");
    expect(listB.body.history).toEqual({});

    await agentB
      .put("/api/self-care-days/2026-08-20")
      .send({ checkedItems: { water: false } });

    const listA = await agentA.get("/api/self-care-days?days=90");
    expect(listA.body.history["2026-08-20"]).toEqual({ water: true });
  });
});
