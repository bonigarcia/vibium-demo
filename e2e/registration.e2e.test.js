// Deterministic end-to-end test with the Vibium JS client: no AI involved.
// Start the app first (npm run dev), then run: npm run test:e2e
import { afterAll, beforeAll, expect, test } from 'vitest'
import { browser } from 'vibium'
import { PROMO_CODES, finalPrice } from '../src/registration.js'

const APP_URL = process.env.APP_URL ?? 'http://localhost:5173'
let bro

beforeAll(async () => {
  bro = await browser.start({ headless: true })
}, 60_000)
afterAll(async () => { await bro?.stop() })

// One test per promo code: new codes (like EARLYBIRD) are covered automatically.
for (const code of Object.keys(PROMO_CODES)) {
  test(`register with ${code}`, async () => {
    const page = await bro.page()
    await page.go(APP_URL)
    await page.find('#name').fill('Ada Example')
    await page.find('#email').fill('ada@example.com')
    await page.find('#promo').fill(code)
    await page.find('#privacy').check() // set() in nightly builds
    // click() waits until nothing covers the button (actionability checks)
    await page.find('button[type=submit]').click()
    expect(await page.find('#confirmation').text())
      .toContain(`€${finalPrice('general', code)}`)
  }, 60_000)
}
