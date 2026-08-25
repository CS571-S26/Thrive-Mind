import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

const dayKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");
const checkedItemsSchema = z.record(z.string(), z.boolean());

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 90, 1), 365);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffKey = cutoff.toISOString().slice(0, 10);

    const rows = await prisma.selfCareDay.findMany({
      where: {
        userId: req.session.userId,
        dayKey: { gte: cutoffKey }
      }
    });

    // Reshaped into the date-keyed object the frontend's old localStorage
    // history used, so selfCareHistory.js's derivation helpers (streak,
    // monthly count) need no changes to consume it.
    const history = {};
    rows.forEach((row) => {
      history[row.dayKey] = row.checkedItems;
    });

    res.json({ history });
  } catch (err) {
    next(err);
  }
});

router.put("/:date", requireAuth, async (req, res, next) => {
  try {
    const dateResult = dayKeySchema.safeParse(req.params.date);
    const itemsResult = checkedItemsSchema.safeParse(req.body.checkedItems);

    if (!dateResult.success || !itemsResult.success) {
      return res.status(400).json({ error: "Invalid self-care day." });
    }

    const row = await prisma.selfCareDay.upsert({
      where: {
        userId_dayKey: {
          userId: req.session.userId,
          dayKey: dateResult.data
        }
      },
      update: { checkedItems: itemsResult.data },
      create: {
        userId: req.session.userId,
        dayKey: dateResult.data,
        checkedItems: itemsResult.data
      }
    });

    res.json({ dayKey: row.dayKey, checkedItems: row.checkedItems });
  } catch (err) {
    next(err);
  }
});

export default router;
