import { test, expect } from '@playwright/test';

test('Home page loads and shows navigation & filter elements', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Code Snippets')).toBeVisible();

    await expect(page.getByPlaceholder('🔍 Search snippets by title or tag...')).toBeVisible();

    await expect(page.getByRole('link', { name: "ALL", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "HTML", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "CSS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "JS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "TS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "OTHER", exact: true })).toBeVisible();
});

test('Create a new snippet (The Full Creation Flow)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Code Snippets')).toBeVisible();

    await expect(page.getByPlaceholder('🔍 Search snippets by title or tag...')).toBeVisible();

    await expect(page.getByRole('link', { name: "ALL", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "HTML", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "CSS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "JS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "TS", exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: "OTHER", exact: true })).toBeVisible();
});