import { test, expect } from "@playwright/test";

test("UGO E2E — Customers → Orders → Pagination", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Customers page visible
  await expect(page.getByText("Customers")).toBeVisible();

  // Customers table has rows
  const customerRows = page.locator("table tbody tr");
  await expect(customerRows.first()).toBeVisible();

  // Click first customer
  await customerRows.first().click();

  // Orders page visible
  await expect(
    page.getByRole("columnheader", { name: "Orders" })
  ).toBeVisible();

  // Orders table has rows
  const orderRows = page.locator("table tbody tr");
  await expect(orderRows.first()).toBeVisible();

  // Pagination exists
  const page2Button = page.getByRole("button", { name: "2" });
  await expect(page2Button).toBeVisible();

  // Click page 2
  await page2Button.click();

  // Rows still visible
  await expect(orderRows.first()).toBeVisible();
});
