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

  test("Edit existing flashcards to update their details", async ({ page }) => {
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

  test("Delete flashcards they no longer need", async ({ page }) => {
    await page.getByRole("button", { name: "All Cards" }).click();

    const flashcard = page
      .getByRole("listitem")
      .filter({ hasText: "What is the capital of France?" });

    await flashcard.getByRole("button").click();

    const dotsMenu = page.getByRole("menu");

    await expect(dotsMenu).toBeVisible();

    await dotsMenu.getByText("Delete").click();

    const deleteModal = page.getByRole("dialog");
    const deleteModalHeading = deleteModal.getByRole("heading", {
      level: 2,
      name: "Delete this card?",
    });

    await expect(deleteModalHeading).toBeInViewport();

    await deleteModal.getByRole("button", { name: "Delete Card" }).click();

    await expect(
      page.getByRole("alert", { name: "Card deleted." }),
    ).toBeInViewport();

    await expect(flashcard).toHaveCount(0);
  });

  test("See form validation messages when trying to submit a card without all fields completed", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "All Cards" }).click();

    await page.getByRole("button", { name: "Create Card" }).click();

    const questionError = page.getByText("Question is required.");
    const answerError = page.getByText("Answer is required.");
    const categoryError = page.getByText("Category is required.");

    await expect(questionError).toBeInViewport();
    await expect(answerError).toBeInViewport();
    await expect(categoryError).toBeInViewport();
  });

  test("See flashcard details including question, answer, category, and mastery progress", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "All Cards" }).click();

    const flashcard = page
      .getByRole("listitem")
      .filter({ hasText: "What does HTML stand for?" });

    await expect(flashcard).toContainText("What does HTML stand for?");
    await expect(flashcard).toContainText("HyperText Markup Language");
    await expect(flashcard).toContainText("Web Development");
    await expect(flashcard.getByTestId("progress-bar-track")).toBeVisible();
  });
});

test.describe("Study Mode", () => {
  test("Click on a flashcard to reveal the answer", async ({ page }) => {
    const flashcardInfo = page.getByRole("main").getByRole("main");
    const flashcardQuestion = flashcardInfo.getByRole("heading", {
      level: 1,
    });
    await expect(flashcardQuestion).toHaveText("What does HTML stand for?");
    await flashcardInfo.click();
    await expect(flashcardQuestion).toHaveText("HyperText Markup Language");
  });

  test('Mark a flashcard as known by clicking "I Know This" to track mastery progress', async ({
    page,
  }) => {
    const progressText = page.getByText("0/5");
    await expect(progressText).toBeInViewport();

    const knowButton = page.getByRole("button", { name: "I Know This" });
    await knowButton.click();

    const previousButton = page.getByRole("button", { name: "Previous" });
    await expect(previousButton).toBeEnabled();
    await previousButton.click();

    const newProgressText = page.getByText("1/5");
    await expect(newProgressText).toBeInViewport();
  });

  test('See which card they\'re currently viewing (e.g., "Card 1 of 40")', async ({
    page,
  }) => {
    const cardIndicator = page.getByText("Card 1 of 40");
    await expect(cardIndicator).toBeInViewport();

    const nextButton = page
      .locator("section")
      .getByRole("button", { name: "Next" });
    await nextButton.click();

    const newCardIndicator = page.getByText("Card 2 of 40");
    await expect(newCardIndicator).toBeInViewport();
  });

  test("Reset progress on a flashcard to start learning it again", async ({
    page,
  }) => {
    const nextButton = page
      .locator("section")
      .getByRole("button", { name: "Next" });
    await nextButton.click();

    const progressText = page.getByText("2/5");
    await expect(progressText).toBeInViewport();

    const resetButton = page.getByRole("button", { name: "Reset Progress" });
    await resetButton.click();

    const newProgressText = page.getByText("0/5");
    await expect(newProgressText).toBeInViewport();
  });
});

test.describe("Filtering & Organization", () => {
  test("Filter flashcards by selecting one or multiple categories", async ({
    page,
  }) => {
    const categoriesButton = page.getByRole("button", {
      name: "All Categories",
    });
    await categoriesButton.click();

    const categoryOption = page.getByRole("option", { name: "Geography" });
    await categoryOption.click();

    const cardIndicator = page.getByText("Card 1 of 4");
    await expect(cardIndicator).toBeVisible();
  });

  test("Hide mastered cards to focus on cards that still need practice", async ({
    page,
  }) => {
    const hideMasteredCheckbox = page.locator("section").getByRole("checkbox");
    await hideMasteredCheckbox.click();

    const cardIndicator = page.getByText("Card 1 of 29");
    await expect(cardIndicator).toBeVisible();
  });
});
