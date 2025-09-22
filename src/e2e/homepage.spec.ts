import { test, expect } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')

  // Check if the main heading is visible
  await expect(page.locator('h1')).toContainText('Connect with friends')

  // Check if the navigation is present
  await expect(page.locator('nav')).toBeVisible()
  await expect(page.locator('text=Sign In')).toBeVisible()
  await expect(page.locator('text=Get Started')).toBeVisible()

  // Check if the features section is visible
  await expect(page.locator('text=Everything you need to coordinate')).toBeVisible()
  await expect(page.locator('text=Easy Scheduling')).toBeVisible()
  await expect(page.locator('text=Smart Venues')).toBeVisible()
  await expect(page.locator('text=Quick Voting')).toBeVisible()
  await expect(page.locator('text=Group Management')).toBeVisible()

  // Check if footer is present
  await expect(page.locator('footer')).toBeVisible()
})

test('navigation links work correctly', async ({ page }) => {
  await page.goto('/')

  // Click on Sign In link
  await page.click('text=Sign In')
  await expect(page).toHaveURL('/auth/signin')
  await expect(page.locator('text=Welcome back')).toBeVisible()

  // Go back and click on Get Started
  await page.goto('/')
  await page.click('text=Get Started')
  await expect(page).toHaveURL('/auth/signup')
  await expect(page.locator('text=Create account')).toBeVisible()
})

test('homepage is mobile responsive', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')

  // Check if content is still visible on mobile
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('text=Connect with friends')).toBeVisible()
  await expect(page.locator('nav')).toBeVisible()

  // Check if mobile-specific elements are present
  await expect(page.locator('text=Sign In')).toBeVisible()
  await expect(page.locator('text=Get Started')).toBeVisible()
})