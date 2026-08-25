-- CreateTable
CREATE TABLE "mood_entries" (
    "entryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resultId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pct" INTEGER NOT NULL,
    "suggestion" TEXT,
    "link" TEXT,
    "categoryScores" JSONB,
    "focusCategory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mood_entries_pkey" PRIMARY KEY ("entryId")
);

-- CreateTable
CREATE TABLE "self_care_days" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayKey" TEXT NOT NULL,
    "checkedItems" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "self_care_days_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mood_entries_userId_entryDate_idx" ON "mood_entries"("userId", "entryDate");

-- CreateIndex
CREATE UNIQUE INDEX "self_care_days_userId_dayKey_key" ON "self_care_days"("userId", "dayKey");

-- AddForeignKey
ALTER TABLE "mood_entries" ADD CONSTRAINT "mood_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "self_care_days" ADD CONSTRAINT "self_care_days_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
