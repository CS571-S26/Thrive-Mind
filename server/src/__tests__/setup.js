import { afterEach, afterAll } from "vitest";
import { prisma } from "../lib/prisma.js";

afterEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
