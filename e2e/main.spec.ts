import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Flashcard Management", () => {
  test("Create new flashcards with a question, answer, and category", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "All Cards" }).click();

    await expect(page.getByRole("form")).toBeVisible();

    await page
      .getByPlaceholder("e.g., What is the capital of France?")
      .fill("What is 2 + 2?");
    await page.getByPlaceholder("e.g., Paris").fill("4");
    await page.getByPlaceholder("e.g., Geography").fill("Math");

    await page.getByRole("button", { name: "Create Card" }).click();

    const newCard = page
      .getByRole("listitem")
      .filter({ hasText: "What is 2 + 2?" });

    await expect(newCard).toContainText("What is 2 + 2?");
    await expect(newCard).toContainText("4");
    await expect(newCard).toContainText("Math");
  });

  test("Edit existing flashcards to update their details", async ({ page }) => {
    await page.getByRole("button", { name: "All Cards" }).click();
  });
});
