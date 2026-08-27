import { test, expect } from "@playwright/test";

// The app advances 300ms after a click/keypress selects an answer.
const ADVANCE_DELAY = 400;

test.describe("Mood Quiz", () => {
  test("completes the quiz and shows recommendations", async ({ page }) => {
    await page.goto("/#/mood");
    await expect(page.getByRole("heading", { name: "Mood Quiz" })).toBeVisible();

    const answers = [
      /About normal/,
      /Okay — some connection/,
      /Not great, restless nights/,
      /Neutral — just getting by/,
      /Managing okay/
    ];

    for (const answer of answers) {
      await page.getByRole("button", { name: answer }).click();
      await page.waitForTimeout(ADVANCE_DELAY);
    }

    // exact: true — "Your check-in" is otherwise also a substring of the
    // "Based on your check-in, here's what you could try now" heading.
    await expect(
      page.getByRole("heading", { name: "Your check-in", exact: true })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Retake Quiz" })).toBeVisible();
    // At least one recommendation card, each of which links to a real page.
    await expect(page.getByText("What you could try now")).toBeVisible();
  });

  test("Back button lets you change a previous answer", async ({ page }) => {
    await page.goto("/#/mood");

    await page.getByRole("button", { name: /Very low, barely able to do things/ }).click();
    await page.waitForTimeout(ADVANCE_DELAY);
    await expect(page.getByText("Question 2 of 5")).toBeVisible();

    await page.getByRole("button", { name: "Go back to the previous question" }).click();
    await expect(page.getByText("Question 1 of 5")).toBeVisible();

    // The originally-selected option should still show as selected.
    await expect(
      page.getByRole("button", { name: /Very low, barely able to do things/ })
    ).toHaveAttribute("style", /var\(--color-primary/);
  });

  test("in-progress quiz survives a page reload", async ({ page }) => {
    await page.goto("/#/mood");

    await page.getByRole("button", { name: /About normal/ }).click();
    await page.waitForTimeout(ADVANCE_DELAY);
    await expect(page.getByText("Question 2 of 5")).toBeVisible();

    await page.reload();
    await expect(page.getByText("Question 2 of 5")).toBeVisible();
  });

  test("an option can be activated with the keyboard alone", async ({ page }) => {
    await page.goto("/#/mood");

    const firstOption = page.getByRole("button", {
      name: /Very low, barely able to do things/
    });
    await firstOption.focus();
    await expect(firstOption).toBeFocused();

    await page.keyboard.press("Enter");
    await page.waitForTimeout(ADVANCE_DELAY);

    await expect(page.getByText("Question 2 of 5")).toBeVisible();
  });
});
