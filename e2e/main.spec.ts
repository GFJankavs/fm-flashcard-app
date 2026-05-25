import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
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

        await expect(
            page.getByRole("alert", { name: "Card created successfully." }),
        ).toBeInViewport();

        const newCard = page
            .getByRole("listitem")
            .filter({ hasText: "What is 2 + 2?" });

        await expect(newCard).toContainText("What is 2 + 2?");
        await expect(newCard).toContainText("4");
        await expect(newCard).toContainText("Math");
    });

    test("Edit existing flashcards to update their details", async ({
        page,
    }) => {
        await page.getByRole("button", { name: "All Cards" }).click();

        const flashcard = page
            .getByRole("listitem")
            .filter({ hasText: "What does HTML stand for?" });

        await flashcard.getByRole("button").click();

        const dotsMenu = page.getByRole("menu");

        await expect(dotsMenu).toBeVisible();

        await dotsMenu.getByText("Edit").click();

        await expect(
            page.getByRole("heading", { level: 2, name: "Edit your card" }),
        ).toBeInViewport();

        const editForm = page
            .getByRole("form")
            .filter({ hasText: "Edit your card" });

        const questionInput = editForm.locator('input[name="question"]');
        const answerInput = editForm.locator('textarea[name="answer"]');
        const categoryInput = editForm.locator('input[name="category"]');

        await expect(questionInput).toHaveValue("What does HTML stand for?");
        await expect(answerInput).toHaveValue("HyperText Markup Language");
        await expect(categoryInput).toHaveValue("Web Development");

        await questionInput.fill("What is HTML?");
        await answerInput.fill("A markup language for the web");
        await categoryInput.fill("Frontend");

        await editForm.getByRole("button", { name: "Update Card" }).click();

        await expect(
            page.getByRole("alert", { name: "Card updated successfully." }),
        ).toBeInViewport();

        const updatedCard = page
            .getByRole("listitem")
            .filter({ hasText: "What is HTML?" });

        await expect(updatedCard).toContainText("What is HTML?");
        await expect(updatedCard).toContainText("A markup language for the web");
        await expect(updatedCard).toContainText("Frontend");
    });
});
