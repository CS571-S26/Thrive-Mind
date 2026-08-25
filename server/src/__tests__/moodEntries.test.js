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

const sampleEntry = {
  resultId: "okay",
  label: "You seem to be doing okay today",
  emoji: "🌤️",
  pct: 65,
  categoryScores: [
    { category: "Mood", pct: 65 },
    { category: "Sleep", pct: 40 }
  ],
  focusCategory: "Sleep"
};

describe("GET/POST /api/mood-entries", () => {
  it("requires auth", async () => {
    const res = await request(app).get("/api/mood-entries");
    expect(res.status).toBe(401);
  });

  it("creates and lists entries newest-first", async () => {
    const agent = await signupAndGetAgent("student1@wisc.edu");

    await agent.post("/api/mood-entries").send(sampleEntry);
    await agent
      .post("/api/mood-entries")
      .send({ ...sampleEntry, resultId: "good", pct: 80 });

    const res = await agent.get("/api/mood-entries");
    expect(res.status).toBe(200);
    expect(res.body.entries).toHaveLength(2);
    expect(res.body.entries[0].id).toBe("good");
    expect(res.body.entries[1].id).toBe("okay");
    expect(res.body.entries[0].categoryScores).toEqual(
      sampleEntry.categoryScores
    );
  });

  it("rejects an invalid entry", async () => {
    const agent = await signupAndGetAgent("student2@wisc.edu");
    const res = await agent
      .post("/api/mood-entries")
      .send({ ...sampleEntry, pct: 500 });

    expect(res.status).toBe(400);
  });

  it("never returns another user's entries", async () => {
    const agentA = await signupAndGetAgent("studentA@wisc.edu");
    const agentB = await signupAndGetAgent("studentB@wisc.edu");

    await agentA.post("/api/mood-entries").send(sampleEntry);

    const res = await agentB.get("/api/mood-entries");
    expect(res.status).toBe(200);
    expect(res.body.entries).toHaveLength(0);
  });
});
