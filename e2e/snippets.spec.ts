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

test.describe.serial('group', () => {
    test('Create a new snippet (The Full Creation Flow)', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('link', { name: '+ New Snippet' }).click();

        await expect(page.getByText('Create New Snippet')).toBeVisible();

        await page.getByLabel('Title').fill('[E2E] Automated Test Snippet');
        await page.getByLabel('Language').selectOption('ts');
        await page.getByLabel('Tags').fill('test, automated, playwright');
        await page.getByLabel('Code Snippet').fill('console.log("Hello from Playwright E2E!");');

        await page.getByRole('button', { name: 'Save Snippet' }).click();

        await expect(page).toHaveURL('/');

        await expect(page.getByText('[E2E] Automated Test Snippet')).toBeVisible();
    });

    test('Delete the created snippet (Modal Confirmation Flow)', async ({ page }) => {
        await page.goto('/');

        await page.getByText('[E2E] Automated Test Snippet').click();

        await expect(page).toHaveURL(/\/snippet\/\d+/);

        await page.locator('svg.lucide-trash-2').click();

        await expect(page.getByText('Are you sure you want to delete this snippet?')).toBeVisible();

        await page.getByRole('button', { name: 'Delete' }).click();

        await expect(page).toHaveURL('/');

        await expect(page.getByText('[E2E] Automated Test Snippet')).not.toBeVisible();
    });
});

test('Search with Debounce', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('🔍 Search snippets by title or tag...').fill('fibonacci');

    await expect(page.getByText('firsthtml')).not.toBeVisible();
    await expect(page.getByText('firstcss')).not.toBeVisible();
    await expect(page.getByText('demo')).not.toBeVisible();
    await expect(page.getByText('fibonacci')).toBeVisible();

    await page.getByPlaceholder('🔍 Search snippets by title or tag...').fill('');

    await expect(page.getByText('firsthtml')).toBeVisible();
    await expect(page.getByText('firstcss')).toBeVisible();
    await expect(page.getByText('demo')).toBeVisible();
    await expect(page.getByText('fibonacci')).toBeVisible();

});

test('Language Tab Filtering', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: "JS", exact: true }).click();
    await expect(page).toHaveURL('/?lang=js');

    await page.getByRole('link', { name: "CSS", exact: true }).click();
    await expect(page).toHaveURL('/?lang=css');
});

// test('Required Field Validation', async ({ page }) => {
//     await page.goto('/');

// });

// test('Copy Code to Clipboard', async ({ page }) => {
//     await page.goto('/');

// });