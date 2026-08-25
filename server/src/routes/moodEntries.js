import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

const categoryScoreSchema = z.object({
  category: z.string().min(1),
  pct: z.number().min(0).max(100)
});

const createEntrySchema = z.object({
  resultId: z.string().min(1),
  label: z.string().min(1),
  emoji: z.string().min(1),
  pct: z.number().min(0).max(100),
  suggestion: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  categoryScores: z.array(categoryScoreSchema).optional().nullable(),
  focusCategory: z.string().optional().nullable()
});

// Reshapes a Prisma MoodEntry row back into the exact shape the frontend's
// old localStorage entries used, so moodScoring.js/recommendations.js (both
// storage-agnostic) need no changes to consume it.
const toClientEntry = (entry) => ({
  id: entry.resultId,
  label: entry.label,
  emoji: entry.emoji,
  date: entry.entryDate.toISOString(),
  pct: entry.pct,
  suggestion: entry.suggestion,
  link: entry.link,
  categoryScores: entry.categoryScores,
  focusCategory: entry.focusCategory
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);

    const entries = await prisma.moodEntry.findMany({
      where: { userId: req.session.userId },
      orderBy: { entryDate: "desc" },
      take: limit
    });

    res.json({ entries: entries.map(toClientEntry) });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const parsed = createEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid mood entry." });
    }

    const entry = await prisma.moodEntry.create({
      data: {
        userId: req.session.userId,
        ...parsed.data
      }
    });

    res.status(201).json({ entry: toClientEntry(entry) });
  } catch (err) {
    next(err);
  }
});

export default router;
