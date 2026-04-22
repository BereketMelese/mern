import { expect, test } from "@playwright/test";

const createEmail = () =>
  `playwright-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;

test("user can register, reach dashboard, log out, and log back in", async ({
  page,
}) => {
  const email = createEmail();
  const password = "Password123!";

  await page.goto("/register");
  await page.getByLabel("Name").fill("Playwright User");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByLabel("Confirm Password").fill(password);
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
