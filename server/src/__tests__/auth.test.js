import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp();

const validSignup = {
  email: "student@wisc.edu",
  password: "correcthorsebattery",
  displayName: "Student"
};

describe("POST /api/auth/signup", () => {
  it("creates a user and starts a session", async () => {
    const agent = request.agent(app);
    const res = await agent.post("/api/auth/signup").send(validSignup);

    expect(res.status).toBe(201);
    expect(res.body.user).toMatchObject({
      email: validSignup.email,
      displayName: validSignup.displayName
    });
    expect(res.body.user.passwordHash).toBeUndefined();

    const me = await agent.get("/api/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe(validSignup.email);
  });

  it("rejects a weak password", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ ...validSignup, password: "short" });

    expect(res.status).toBe(400);
  });

  it("rejects a duplicate email", async () => {
    await request(app).post("/api/auth/signup").send(validSignup);
    const res = await request(app).post("/api/auth/signup").send(validSignup);

    expect(res.status).toBe(409);
  });
});

describe("POST /api/auth/login", () => {
  it("logs in with correct credentials", async () => {
    await request(app).post("/api/auth/signup").send(validSignup);

    const agent = request.agent(app);
    const res = await agent.post("/api/auth/login").send({
      email: validSignup.email,
      password: validSignup.password
    });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(validSignup.email);
  });

  it("gives the same error for a wrong password as an unknown email", async () => {
    await request(app).post("/api/auth/signup").send(validSignup);

    const wrongPassword = await request(app).post("/api/auth/login").send({
      email: validSignup.email,
      password: "wrongpassword"
    });
    const unknownEmail = await request(app).post("/api/auth/login").send({
      email: "nobody@wisc.edu",
      password: "wrongpassword"
    });

    expect(wrongPassword.status).toBe(401);
    expect(unknownEmail.status).toBe(401);
    expect(wrongPassword.body).toEqual(unknownEmail.body);
  });
});

describe("GET /api/auth/me", () => {
  it("returns 401 when not signed in", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });
});

describe("POST /api/auth/logout", () => {
  it("ends the session so /me is no longer authorized", async () => {
    const agent = request.agent(app);
    await agent.post("/api/auth/signup").send(validSignup);

    const logout = await agent.post("/api/auth/logout");
    expect(logout.status).toBe(204);

    const me = await agent.get("/api/auth/me");
    expect(me.status).toBe(401);
  });
});
