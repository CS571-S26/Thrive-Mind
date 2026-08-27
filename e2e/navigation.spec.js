import { test, expect } from "@playwright/test";

test.describe("Deep links and navigation", () => {
  test("a direct link to a Resources section lands on the right tab", async ({ page }) => {
    await page.goto("/#/resources?section=uw-madison-support");

    await expect(
      page.getByRole("tab", { name: /UW–Madison Support/ })
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("UHS Crisis Support Line")).toBeVisible();
  });

  test("Home's 'I want someone to talk to' card routes to that same tab", async ({
    page
  }) => {
    await page.goto("/#/");

    await page.getByRole("link", { name: "I want someone to talk to" }).click();

    await expect(page).toHaveURL(/#\/resources/);
    await expect(
      page.getByRole("tab", { name: /UW–Madison Support/ })
    ).toHaveAttribute("aria-selected", "true");
  });

  test("a direct link to an Issues topic opens that card", async ({ page }) => {
    await page.goto("/#/issues?open=stress");

    // exact: true — Playwright's string name matching is substring-based by
    // default, and "Academic Pressure & Exam Stress — read more" also
    // contains "Stress — read more".
    await expect(
      page.getByRole("button", { name: "Stress — read more", exact: true })
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("the crisis banner's resources link works from any page", async ({ page }) => {
    await page.goto("/#/about");
    await page.getByRole("link", { name: "see more resources" }).click();
    await expect(page).toHaveURL(/#\/resources/);
  });
});

test.describe("Mobile navigation", () => {
  test("the nav collapses behind a hamburger and still works", async ({
    page,
    isMobile
  }) => {
    test.skip(!isMobile, "desktop nav is always expanded");

    await page.goto("/#/");

    const moodLink = page.getByRole("link", { name: "Mood Quiz" });
    await expect(moodLink).toBeHidden();

    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await expect(moodLink).toBeVisible();

    await moodLink.click();
    await expect(page).toHaveURL(/#\/mood/);
  });
});

test.describe("Desktop navigation", () => {
  test("all primary nav links are visible without opening a menu", async ({
    page,
    isMobile
  }) => {
    test.skip(isMobile, "covered by the mobile nav test instead");

    await page.goto("/#/");
    await expect(page.getByRole("link", { name: "Mood Quiz" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Privacy & Safety" })).toBeVisible();
  });
});
